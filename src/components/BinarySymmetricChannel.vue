<template>
  <div class="col-6 mt-3">
    <b-card>
      <b-card-header>
        <h4>Binary Symmetric Channel</h4>
      </b-card-header>
      <b-card-body>
        <div class="m-2">
          <p class="m-0"><label for="range-f">bit flip probability {{ f }}</label></p>
          <b-form-input id="range-f" class="mw-100" :value="f" @input="(v) => {$emit('update:f', Number(v))}" type="range" min="0"
                        max="1"
                        step="0.0001"/>
        </div>
        <p>Transmitted: {{input}}</p>
        <p>Received: {{received_signal}}</p>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "BinarySymmetricChannel",
  props: {
    f: { // bit flip probability
      type: Number,
      required: true,
    },
    input: { // booleans to be transmitted
      type: String,
      required: false,
      validator(t) {
        let valid = true
        for (let i = 0; i < t.length; i++) {
          valid = valid && ['0', '1'].includes(t[i])
        }
        return valid
      }
    }
  },
  methods: {
    pass_through_channel() {
      if (this.input) {
        let input = this.input
        let result = []
        input.split('').forEach((input_bit) => {
          if (Math.random() <= this.f) { // randomly flip bit
            result.push(this.flip(input_bit))
          } else {
            result.push(input_bit)
          }
        })
        return result
      }
      return null
    },
    flip(bit) {
      return bit === '0' ? '1' : '0'
    }
  },
  computed: {
    received_signal() {
      let received = this.pass_through_channel()
      if (received) {
        let result = ""
        received.forEach((bit) => {
          result += bit
        })
        return result
      }
      return null
    }
  },
  watch: {
    received_signal(new_received_signal) {
      this.$emit('received', new_received_signal)
    }
  }
}
</script>

<style scoped>

</style>