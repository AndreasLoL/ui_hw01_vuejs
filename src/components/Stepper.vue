<template>
    <md-steppers class="background" md-vertical md-linear :md-active-step.sync="active">
      <md-step id="first" md-label="Üldandmed" :md-editable="true" :md-done.sync="first">
        <step-one-container v-on:complete="setDone('first', 'second')"></step-one-container>
      </md-step>

      <md-step id="second" md-label="Aadressid" :md-editable="true" :md-done.sync="second">
        <step-two-container v-on:others="setData" v-on:complete="setDone('second', 'third')"></step-two-container>
      </md-step>

      <md-step id="third" md-label="Õigused" :md-editable="true" :md-done.sync="third">
        <step-three-container v-on:complete="setDone('third', 'fourth')"></step-three-container>
      </md-step>

      <md-step id="fourth" md-label="Täiendavad andmed" :md-editable="false" :md-done.sync="fourth">
        <step-four-container :data_about_others="this.dataAboutOthers" v-on:complete="setDone('fourth', 'fourth')"></step-four-container>
      </md-step>
    </md-steppers>
</template>

<script>

import NewStepOne from "./NewStepOne";
import NewStepTwo from "./NewStepTwo";
import NewStepThree from "./NewStepThree";
import NewStepFour from "./NewStepFour";
import StepOneContainer from "./StepOneContainer";
import StepTwoContainer from "./StepTwoContainer";
export default {
  name: 'HelloWorld',
  data: () => ({
    first: false,
    second: false,
    third: false,
    fourth: false,
    active: "first",
    dataAboutOthers: false
  }),
  methods: {
    setDone (id, index) {
      this[id] = true;

      if (index) {
        this.active = index
      }
      console.log(id)
      if (id === "fourth") {
        this.$emit('complete');
      }
    },
    setData(id, data) {
      this[id] = data;
    }
  },
  components: {
    'step-one-container': NewStepOne,
    'step-two-container': NewStepTwo,
    'step-three-container': NewStepThree,
    'step-four-container': NewStepFour
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
