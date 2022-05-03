<template>
  <div id="app">
     <convcode/>
  </div>
</template>

<script>
import convcode from '@/components/convcode'
export default {
  name: 'App',
  components: {
    convcode
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
  margin-top: 60px;
}
</style>