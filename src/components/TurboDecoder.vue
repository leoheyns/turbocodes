<template>
  <div class="col-12 mt-3">
    <b-card>
      <b-card-header>
        <h4>Decoder</h4>
      </b-card-header>
      <b-card-body>
        decoded: <errordisplayer :source="source" :decoded="result"/>
        <trellis :trellis="trellis" />
      </b-card-body>
    </b-card>
  </div>
</template>

<script>

import {Trellis, viterbi} from "@/decoding/viterbi";
import trellis from "@/components/trellis"
import errordisplayer from "@/components/errordisplayer"

export default {
  name: "TurboDecoder",
  props: {
    trellis: Trellis,
    input: String,
    f: Number,
    source: String,
  },
  components: {
    trellis,
    errordisplayer
  },
  computed: {
    result(){
      console.log(this.input)
      if(this.input && this.trellis){
        let priors = {}
        let recieved = {}
        for(let i = 0; i < this.input.length / 2; i++){
          priors[i + '' + (i + 1)] = 0
          recieved[i + '' + (i + 1)] = this.input.slice(i * 2, (i + 1) * 2)
        }
        let result = viterbi(this.trellis, recieved, priors, this.f)
        this.trellis.edges.map(edge => edge.color = 'black')
        result.best_path.map(edge => edge.color = 'red')
        return result.best_path.map(edge => edge.u).join('')
      } else {
        return ""
      }
    }
  }
}
</script>

<style scoped>

</style>