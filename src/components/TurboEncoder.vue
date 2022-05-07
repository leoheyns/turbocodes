<template>
  <div class="col-12 mt-3">
    <b-card>
      <b-card-header>
        <h4>Encoder</h4>
      </b-card-header>
      <b-card-body>
        <convcode :source="source" @encoded="(encoded) => $emit('encoded', encoded)"/>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
//todo: use two convolutional codes
import convcode from "@/components/convcode";

export default {
  name: "TurboEncoder",
  props: {
    source: String,
  },
  components: {
    convcode,
  }
}
</script>

<style scoped>

</style>