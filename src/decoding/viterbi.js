export {
    Edge, Node, viterbi, min_sum
}

class Edge {
    constructor(u, x, from, to) {
        this.u = u // input
        this.x = x // outputs
        this.from = from
        this.to = to
        this.from.addOutgoing(this)
        this.to.addIncoming(this)
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

function log_gamma(edge, llr_prior, y, f) {
    // f is the flip probability of the Binary Symmetric Channel
    // calculate prob_edge = p(y | x) * p(u) where p(u) is the prior
    let u = edge.u
    u = u > 0 ? 1 : -1 // convert to a {-1, 1} space
    let log_p_u = -Math.log(1+Math.exp(llr_prior * u))
    let log_p_ygivenx = Math.log(1) // 0
    Object.keys(y).forEach((l) => {
        if (y[l] === edge.x[l]) {
            log_p_ygivenx += Math.log(1-f)
        }
        log_p_ygivenx += Math.log(f)
    })
    return log_p_u + log_p_ygivenx
}

function min_sum(nodes, edges, edge_costs) {
    // todo: test this function
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

                if (edge_costs[edge] + node_costs[edge.from]  < edge_costs[best_edge] + node_costs[best_edge.from]) {
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

function viterbi(nodes, edges, received_signal, llr_priors, f) {
    // todo: test this function
    // f is bit flip probability

    // received_signal should be a dict from edge times to bit values in {0,1}. Edge times are
    // defined as concatenations of from-node and to-node times

    // llr_priors should be a dict from edge times to a priori LLRs, indicating the
    // a priori log-likelihood ratio per source bit in the trellis.

    // sort the nodes such that we can iterate through them and determine log probabilities
    nodes.sort((a,b) => {
        return a.time === b.time ? a.state > b.state : a.time > b.time // string or number compare
    })
    let edge_costs = {}
    edges.forEach((edge) => {
        let llr_prior = llr_priors[edge.time]
        let log_g = log_gamma(edge, llr_prior, received_signal[edge.time], f)
        edge_costs[edge] = -log_g
    })
    return min_sum(nodes, edges, edge_costs)
}
