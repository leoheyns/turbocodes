<template>
    <div id="hello-vue" class="cont">
    <template v-for="node in nodes"  >
        <div :key="node" :style="node.style">
            </div>
        </template>
    </div>
</template>

<script>

export default {
    data() {
        return {
        message: 'Hello Vue!!',
        states_by_time: {
            0: [0],
            1: [0,1],
            2: [0,1,2,3]
                        },
        }
    },
    computed: {
        nodes() {
        let nodes = []
        Object.keys(this.states_by_time).forEach((time) => {
            this.states_by_time[time].forEach((state) => {
            let node = {}
            let bottom = state * 50
            let left = time * 50
            let height = 20
            let width = 20
            node.style = `height: ${height}px; width: ${width}px; position: absolute; bottom: ${bottom}px; left: ${left}px; background-color: black;`
            nodes.push(node)
            })
        })
        console.log(nodes)
        return nodes
        }
    }
}
</script>

<style scoped>
.cont {
  width: 400px;
  height: 400px;
  background-color: red;
  position: relative;
}
</style>