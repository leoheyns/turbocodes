<template>
  <div class="col-12 mt-3">
    <b-card>
      <b-card-header>
        <h4>Decoder</h4>
      </b-card-header>
      <b-card-body>
        decoded: <errordisplayer :source="source" :decoded="decoded"/>
        <b-button @click="go">go</b-button>
        <!-- <trellis :trellis="trellis" /> -->
      </b-card-body>
    </b-card>
  </div>
</template>

<script>

import {turboturbo, Interleaver} from "@/decoding/viterbi";
// import trellis from "@/components/trellis"
import errordisplayer from "@/components/errordisplayer"

export default {
  name: "TurboDecoder",
  props: {
    trellises: Array,
    input: String,
    f: Number,
    source: String,
    interleaver: Interleaver,
  },
  data() {
    return {
      decoded: ""
    }
  },
  components: {
    // trellis,
    errordisplayer
  },
  methods: {
    go(){
      if(this.input && this.trellises){
        let recieved = {}
        for(let i = 0; i < this.input.length / 3; i++){
          recieved[i + '' + (i + 1)] = this.input.slice(i * 3, (i + 1) * 3)
        }
        let result = turboturbo(this.trellises, this.interleaver, recieved, this.f)
        console.log(result)
        this.decoded = result
        // this.trellis.edges.map(edge => edge.color = 'black')
        // result.best_path.map(edge => edge.color = 'red')
        // return result.best_path.map(edge => edge.u).join('')
      } else {
        return ""
      }
    },
  }
}
</script>

<style scoped>

</style>