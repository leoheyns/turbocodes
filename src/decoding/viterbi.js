export {
    Edge, Node, Trellis, Interleaver, viterbi, min_sum, sum_product, turboturbo,
}

class Edge {
    constructor(u, x, from, to) {
        this.u = u // input
        this.x = x // outputs
        this.from = from
        this.to = to
        this.from.addOutgoing(this)
        this.to.addIncoming(this)
        this.color = 'black'
        this.log_g = 0
    }

    get time() {
        return this.from.time + '' + this.to.time // I hope js doesn't do wacky shit here
    }

    toString() {
        let o = {
            from: this.from.toString(),
            to: this.to.toString(),
            u: this.u,
            x: this.x
        }
        return JSON.stringify(o)
    }

}

class Node {
    constructor(time, state) {
        this.time = time
        this.state = state
        this.incoming = []
        this.outgoing = []
    }

    addIncoming(edge) {
        this.incoming.push(edge)
    }

    addOutgoing(edge) {
        this.outgoing.push(edge)
    }

    toString() {
        let o = {
            time: this.time,
            state: this.state,
        }
        return JSON.stringify(o)
    }
}

class Trellis {
    constructor(nodes, edges) {
        this.nodes = nodes
        this.edges = edges
        let edge_times_set = {} // objects work like hasmaps/hashsets, which is quite useful but also funny
        this.edges.forEach((edge) => {
            edge_times_set[edge.time] = null // we don't use the values, only the keys
        })
        let times = {}
        this.nodes.forEach((node) => {
            times[node.time] = null // we don't use the values, only the keys
        })
        this.times = Object.keys(times)
        this.edge_times = Object.keys(edge_times_set)
        // determine nodes per time
        let nodes_per_time = {}
        // calculate maximal width
        let time_widths = {}
        this.times.forEach((time) => {
            nodes_per_time[time] = []
            time_widths[time] = 0
        })
        this.nodes.forEach((node) => {
            nodes_per_time[node.time].push(node)
            time_widths[node.time] += 1
        })
        this.nodes_per_time = nodes_per_time
        this.time_widths = time_widths
        this.maximal_width = Math.max(...Object.values(time_widths))
    }

}

class Interleaver {
    constructor(mapping) {
        this.mapping = mapping // defines a dict k1 -> k2 meaning that any dictionary k1 -> v will be interleaved into k2 -> v
        let reverse_mapping = {}
        Object.keys(mapping).forEach((k) => {
            let v = mapping[k]
            reverse_mapping[v] = k // assumes mapping is a bijection (so keys map to distinct values)
        })
        this.reverse_mapping = reverse_mapping
    }

    interleave_with_map(dict_to_interleave, mapping) {
        let interleaved = {}
        Object.keys(dict_to_interleave).forEach((k) => {
            interleaved[mapping[k]] = dict_to_interleave[k]
        })
        return interleaved
    }

    interleave(dict_to_interleave) {
        return this.interleave_with_map(dict_to_interleave, this.mapping)
    }

    deinterleave(dict_to_deinterleave) {
        return this.interleave_with_map(dict_to_deinterleave, this.reverse_mapping)
    }
}


function log_gamma(edge, llr_prior, y, f) {
    // f is the flip probability of the Binary Symmetric Channel
    // calculate prob_edge = p(y | x) * p(u) where p(u) is the prior
    let u = edge.u
    u = u > 0 ? 1 : -1 // convert to a {-1, 1} space
    let log_p_u = -Math.log(1 + Math.exp(llr_prior * -u))
    let log_p_ygivenx = Math.log(1) // 0
    Object.keys(y).forEach((l) => {
        if (y[l] === edge.x[l]) {
            log_p_ygivenx += Math.log(1 - f)
        }
        else{
            log_p_ygivenx += Math.log(f)
        }
    })
    let log_g = log_p_u + log_p_ygivenx
    edge.log_g = log_g
    return log_g
}

function min_sum(nodes, edges, edge_costs) {
    // calculate minimum sum
    // assumptions:
    //  nodes are sorted
    //  first node cost is 0
    //  path cost is calculated by summing costs of edges along the path
    //  total path cost is to be minimized
    let node_costs = {}
    let best_paths = {}
    nodes.forEach((node) => {
        if (node === nodes[0]) {
            node_costs[node] = 0
            best_paths[node] = []
        } else {
            let best_edge = node.incoming[0]
            node.incoming.forEach((edge) => {

                if (edge_costs[edge] + node_costs[edge.from] < edge_costs[best_edge] + node_costs[best_edge.from]) {
                    best_edge = edge
                }
            })
            node_costs[node] = edge_costs[best_edge] + node_costs[best_edge.from]
            best_paths[node] = [...best_paths[best_edge.from], best_edge]
        }
    })
    let final_node = nodes[nodes.length - 1]
    return {min_cost: node_costs[final_node], best_path: best_paths[final_node]}
}

function viterbi(trellis, received_signal, llr_priors, f) {
    let nodes = trellis.nodes
    let edges = trellis.edges

    // todo: test this function
    // f is bit flip probability

    // received_signal should be a dict from edge times to bit values in {0,1}. Edge times are
    // defined as concatenations of from-node and to-node times

    // llr_priors should be a dict from edge times to a priori LLRs, indicating the
    // a priori log-likelihood ratio per source bit in the trellis.

    // sort the nodes such that we can iterate through them and determine log probabilities
    nodes.sort((a, b) => {
        return a.time === b.time ? a.state > b.state : a.time > b.time // string or number compare
    })

    let edge_costs = {}
    edges.forEach((edge) => {
        let log_g = log_gamma(edge, llr_priors[edge.time], received_signal[edge.time], f)
        edge_costs[edge] = -log_g
    })
    let result = min_sum(nodes, edges, edge_costs)
    return result
}


function sum_product(trellis, received_signal, llr_priors, f) {
    let nodes = trellis.nodes
    let edges = trellis.edges
    // todo: test this function
    // calculate the a posteriori LLR of input bit values (u) at specific edge times

    // sort nodes by time and state
    nodes.sort((a, b) => {
        return a.time === b.time ? a.state > b.state : a.time > b.time // string or number compare
    })

    let alphas = {}
    let betas = {}
    let gammas = {}
    edges.forEach((edge) => {
        let log_g = log_gamma(edge, llr_priors[edge.time], received_signal[edge.time], f)
        gammas[edge] = Math.exp(log_g)
    })
    nodes.forEach((node) => {
        let alpha = 0
        if (node === nodes[0]) { // starting node
            alpha = 1
        } else {
            node.incoming.forEach((edge) => {
                alpha += alphas[edge.from] * gammas[edge]
            })
        }
        alphas[node] = alpha
    })
    nodes.reverse()
    nodes.forEach((node) => {
        let beta = 0
        if (node === nodes[0]) { // final node
            beta = 1
        } else {
            node.outgoing.forEach((edge) => {
                beta += betas[edge.to] * gammas[edge]
            })
        }
        betas[node] = beta
    })
    let llr_posteriors = {}
    let edge_times = Object.keys(llr_priors)
    edge_times.forEach((edge_time) => {
        // see the course book chapter 25 for definition of r^(t)_n.
        // here, r[0] denotes r^(0)_{edge_time} and r[1] denotes r^(1)_{edge_time}
        let r = {0: 0, 1: 0}
        let edges_in_time = edges.filter((edge) => edge.time === edge_time)
        edges_in_time.forEach((edge) => {
            r[edge.u] += alphas[edge.from] * gammas[edge] * betas[edge.to]
        })
        llr_posteriors[edge_time] = Math.log(r[0] / r[1])
    })
    return llr_posteriors
}

function get_extrinsic_information(llr_posteriors, llr_priors, received_signal, f) {
    let llr_ext = {}
    Object.keys(received_signal).forEach((edge_time) => {
        let y0 = received_signal[edge_time][0]
        y0 = y0 > 0 ? 1 : -1
        let channel_reliability_measure = Math.log((1 / 2 + y0 * (1 / 2 - f)) / (1 / 2 - y0 * (1 / 2 - f))) // see notes for why this is an appropriate calculation
        llr_ext[edge_time] = llr_posteriors[edge_time] - llr_priors[edge_time] - channel_reliability_measure
    })
    return llr_ext
}

function turboturbo(trellises, interleaver, received_signal, f) {
    // turbo decoding
    // assumes:
    //  trellises contains two Trellis instances
    //  interleaver is an instance of Interleaver
    //  received_signal is a string of received bits
    let first = trellises[0]
    let second = trellises[1]
    let llr_priors = {}
    let systematic = {}
    let parity_first = {}
    let parity_second = {}
    let edge_times = first.edge_times
    for (let i = 0; i < edge_times.length; i++) {
        let edge_time = edge_times[i]
        systematic[edge_time] = received_signal[i * 3]
        parity_first = received_signal[i * 3 + 1]
        parity_second = received_signal[i * 3 + 2]
    }
    let systematic_interleaved = interleaver.interleave(systematic)
    edge_times.forEach((edge_time) => {
        let unbiased_likelihood_ratio = 1 // neither option is more likely
        llr_priors[edge_time] = Math.log(unbiased_likelihood_ratio)
    })
    // todo: implement a function which interleaves a dictionary with edge times as keys, and a deinterleave function
    let llr_priors_interleaved = interleaver.interleave(llr_priors)
    let iteration = 0
    let max_iterations = 100
    let stop = false
    let llr_priors_first = llr_priors
    let llr_priors_second = llr_priors_interleaved
    let llr_posteriors = {}

    let received_signal_first = {}
    let received_signal_second = {}
    edge_times.forEach((edge_time) => {
        received_signal_first[edge_time] = [systematic[edge_time], parity_first[edge_time]]
        received_signal_second[edge_time] = [systematic_interleaved[edge_time], parity_second[edge_time]]
    })
    while (!stop) {
        llr_posteriors[first] = sum_product(first, received_signal_first, llr_priors_first, f)
        llr_posteriors[second] = sum_product(second, received_signal_second, llr_priors_second, f)

        llr_priors_second = interleaver.interleave(get_extrinsic_information(llr_posteriors[first], llr_priors_first, received_signal_first, f))
        llr_priors_first = interleaver.deinterleave(get_extrinsic_information(llr_posteriors[second], llr_priors_second, received_signal_second, f))

        iteration += 1
        stop = iteration >= max_iterations
    }
    return llr_posteriors // the second element of posteriors is still interleaved
}
