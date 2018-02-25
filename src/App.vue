<template>
  <div id="app">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Vue from 'vue'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueMaterial from 'vue-material'
import StepOneContainer from './components/StepOneContainer'

Vue.use(VueMaterial)
export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.md-card {
  box-shadow: none !important;
}
.md-icon {
  &.md-size-05 {
    width: 12px;
    min-width: 12px;
    height: 12px;
    font-size: 12px;
    margin-bottom: 2px;
  }
}


.float-left {
  float: left;
}

.start-content {
  text-align: start;
  padding-left: 12px;
}
</style>
