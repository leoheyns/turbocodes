<template>
  <div id="app">
    <div class="container">
      <div class="col p-5">
        <h1>Convolutional Codes</h1>
        <div class="row mt-5">
          <div class="col-2"><label for="source">source:</label></div>
          <div class="col">
            <b-form-input v-model="source" placeholder="enter source bits"></b-form-input>
          </div>
        </div>

        <div class="row">
          <TurboEncoder :source="source" @encoded="set_encoded1" @trellis="set_trellis1"/>
          <TurboEncoder :source="source_interleaved" @encoded="set_encoded2" @trellis="set_trellis2"/>

          <BinarySymmetricChannel :f.sync="flip_probability" :input="encoded" @received="set_received"/>

          <TurboDecoder :input="received" :source="source" :trellises="trellises" :interleaver="interleaver" :f="flip_probability" @decoded="set_decoded"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TurboEncoder from "@/components/TurboEncoder";
import TurboDecoder from "@/components/TurboDecoder";
import BinarySymmetricChannel from "@/components/BinarySymmetricChannel";
import {Interleaver} from "@/decoding/viterbi"
export default {
  name: 'App',
  data() {
    return {
      source: "",
      encoded1: "",
      encoded2: "",
      received: "",
      decoded: "",
      trellis1: null,
      trellis2: null,
      flip_probability: 0.05,
    }
  },
  methods: {
    set_received(signal) {
      this.received = signal
    },
    set_encoded1(encoded) {
      this.encoded1 = encoded
    },
    set_encoded2(encoded) {
      this.encoded2 = encoded
    },
    set_decoded(decoded) {
      this.decoded = decoded
    },
    set_trellis1(trellis) {
      this.trellis1 = trellis
    },
    set_trellis2(trellis) {
      this.trellis2 = trellis
    },
  },
  computed: {
    encoded(){
      let encoding = ""
      for (let i = 0; i < this.encoded1.length / 2; i++) {
        encoding += this.encoded1[i*2] + this.encoded1[i*2+1] + this.encoded1[i*2 + 1]
      }
      return encoding
    },
    interleaver(){
      let values = [...Array(this.source.length).keys()]
      let keys = [...Array(this.source.length).keys()]
      let terminatebits = this.encoded1.length - this.source.length
      terminatebits = terminatebits > 0 ? terminatebits : 0

      for(let i = 0; i < values.length; i++){
        values[i] = i + '' + (i + 1)
        keys[i] = i + '' + (i + 1)
      }
      values.sort(() => 0.5 - Math.random())

      for(let i = values.length; i < values.length + terminatebits; i++){
        values.push(i + '' + (i + 1))
        keys.push(i + '' + (i + 1))
      }

      let interleaving = {}
      for(let i = 0; i < values.length; i++){
        interleaving[keys[i]] = values[i]
      }

      let inter = new Interleaver(interleaving)
      return inter
    },
    trellises(){
      return [this.trellis1, this.trellis2]
    },
    source_interleaved(){
      if(this.source.length > 0){
        let splitsource = this.source.split("")
        let sourcedict = {}
        for(let i = 0; i < splitsource.length; i++){
          sourcedict[i + '' + (i+1)] = splitsource[i]
        }
        let interleaved = this.interleaver.interleave(sourcedict)
        let result = ""
        for(let i = 0; i < splitsource.length; i++){
          result += interleaved[i + '' + (i+1)]
        }

        return result
      } else {
        return ""
      }
    }
  },
  components: {
    TurboEncoder,
    TurboDecoder,
    BinarySymmetricChannel,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

body {
  height: 100vh;
}


label{
  width: 100%;
  text-align: start;
}
</style>