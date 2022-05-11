<template>
  <div class="col-12 mt-3">
      <span v-for="(bit, index) in perbit" :key="index" :style="bit.style">{{bit.bit}}</span>
  </div>
</template>

<script>
export default {
  name: "errordisplayer",
  props: {
    source: String,
    decoded: String,
  },
  computed: {
      perbit() {
        let source_split = this.source.split('')
        let decoded_split = this.decoded.split('')
        let result = Array(source_split.length)
        for(let i = 0; i< source_split.length; i++){
            result[i] = {bit: this.decoded[i], style: source_split[i] == decoded_split[i] ? {} :{backgroundColor:"#ff0000" }}
        }
        return result
      },
  }
}
</script>

<style scoped>

</style>