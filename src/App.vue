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
          <TurboEncoder :source="source" @encoded="set_encoded" @trellis="set_trellis"/>
          <BinarySymmetricChannel :f.sync="flip_probability" :input="encoded" @received="set_received"/>
          <TurboDecoder :input="received" :source="source" :trellis="trellis" :f="flip_probability" @decoded="set_decoded"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TurboEncoder from "@/components/TurboEncoder";
import TurboDecoder from "@/components/TurboDecoder";
import BinarySymmetricChannel from "@/components/BinarySymmetricChannel";
export default {
  name: 'App',
  data() {
    return {
      source: "",
      encoded: "",
      received: "",
      decoded: "",
      trellis: null,
      flip_probability: 0.05,
    }
  },
  methods: {
    set_received(signal) {
      this.received = signal
    },
    set_encoded(encoded) {
      this.encoded = encoded
    },
    set_decoded(decoded) {
      this.decoded = decoded
    },
    set_trellis(trellis) {
      this.trellis = trellis
    },
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