<template>
  <div>
  </div>
</template>

<script>
import {Edge, Node, min_sum} from "@/decoding/viterbi";

export default {
  name: "viterbi",
  mounted() {
    let times = [0, 1, 2, 3]
    let nodes_idxs = {0: [0], 1: [1, 2], 2: [3, 4], 3: [5]}
    let edge_tups = [[0, 1, 0, 1.0], [0, 2, 1, 2.0], [1, 3, 0, 2.0], [1, 4, 1, 1.0], [2, 3, 0, 1.5], [2, 4, 1, 3.0], [3, 5, 0, 4.0], [3, 5, 1, 6.0], [4, 5, 0, 2.0], [4, 5, 1, 4.0]]
    let nodes = []
    let edges = []
    let edge_costs = {}
    times.forEach((time) => {
      nodes_idxs[time].forEach((node_idx) => {
        nodes.push(new Node(time, node_idx))
      })
    })
    edge_tups.forEach((edge_tup) => {
      let edge = new Edge(edge_tup[2], edge_tup[2], nodes[edge_tup[0]], nodes[edge_tup[1]])
      edges.push(edge)
      edge_costs[edge] = edge_tup[3]
    })
    console.log('min_sum test')
    console.log(min_sum(nodes, edges, edge_costs))

    // todo: test viterbi

  }
}
</script>

<style scoped>

</style>