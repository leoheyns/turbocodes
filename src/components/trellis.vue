<template>
  <div class="trellis">
    <svg height="1000" width="100%">
      <line v-for="(edge, index) in trellis.edges" :key="index + 'edge'" :x1="edge.from.time * timestep + offset" :y1="stateToInt(edge.from.state) * heightstep + offset" :x2="edge.to.time * timestep + offset" :y2="stateToInt(edge.to.state) * heightstep + offset" style="stroke:rgb(0,0,0);stroke-width:5" />
      <circle v-for="(node, index) in trellis.nodes" :key="index + 'node'" :cx="node.time * timestep + offset" :cy="stateToInt(node.state) * heightstep + offset" r="10" stroke="black" stroke-width="4" fill="white" />
    </svg> 
  </div>
</template>

<script>

export default {
    data() {
      return {
        offset: 50,
        timestep: 100,
        heightstep: 50,
      }
    },
    props: {
      trellis: Object,
    },
    computed: {
    },
    methods: {
      stateToInt(state){
        return parseInt(state, 2)
      }
    }
}
</script>

<style scoped>

.trellis {
  flex-grow: 1;
  display: flex;
  align-self: stretch;
}

.cont {
  flex-grow: 1;
  margin: 10px;
  border: black 2px solid;
  border-radius: 5px;
  position: relative;
  align-self: stretch;
}
</style>