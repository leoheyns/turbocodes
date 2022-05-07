<template>
  <div class="col" style="max-width: 100%; overflow: scroll">
    <svg v-if="trellis" :height="`${svgHeight}px`" :width="`${svgWidth}px`">
      <line v-for="(edge, index) in trellis.edges" :key="index + 'edge'" v-b-tooltip.hover :title="edgeInfo(edge)"  :x1="nodeX(edge.from)" :y1="nodeY(edge.from)" :x2="nodeX(edge.to)" :y2="nodeY(edge.to)" style="stroke:rgb(0,0,0);stroke-width:5" />
      <circle v-for="(node, index) in trellis.nodes" :key="index + 'node'" v-b-tooltip.hover :title="nodeInfo(node)"  :cx="nodeX(node)" :cy="nodeY(node)" r="10" stroke="black" stroke-width="4" fill="white" />
    </svg>
  </div>
</template>

<script>

import {Trellis} from "@/decoding/viterbi";

export default {
    data() {
      return {
        offset: 50,
        timestep: 100,
        heightstep: 50,
      }
    },
    props: {
      trellis: Trellis,
    },
    computed: {
      svgHeight() {
        let total_states = Math.pow(2,this.trellis.nodes[0].state.length)
        return (total_states - 1) * this.heightstep + 2*this.offset
      },
      svgWidth() {
        let trellis_length = this.trellis.times.length
        return (trellis_length - 1) * this.timestep + 2*this.offset
      }
    },
    methods: {
      stateToInt(state){
        return parseInt(state, 2)
      },
      nodeY(node) {
        // let time = node.time
        // let nodes_in_time = this.trellis.nodes_per_time[time]
        // nodes_in_time.sort((a,b) => { return a.state > b.state })
        // let nodeHeight = nodes_in_time.indexOf(node)
        let nodeHeight = this.stateToInt(node.state)
        return this.svgHeight - (nodeHeight * this.heightstep + this.offset)
      },
      nodeX(node) {
        let time = node.time
        return time * this.timestep + this.offset
      },
      edgeInfo(edge) {
        return `input: ${edge.u}\noutput: ${edge.x.ta}${edge.x.tb}`
      },
      nodeInfo(node) {
        return `state: ${node.state}\ntime: ${node.time}`
      }
    }
}
</script>

<style scoped>


</style>