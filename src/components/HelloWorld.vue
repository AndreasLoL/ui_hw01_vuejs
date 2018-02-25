<template>
  <div class="hello">
    <div>
      <md-steppers md-vertical md-linear :md-active-step.sync="active">
        <md-step id="first" md-label="First Step" :md-editable="false" :md-done.sync="first">
          <step-one-container></step-one-container>
          <md-button class="md-raised md-primary" v-on:click="setDone('first', 'second')">Edasi</md-button>
        </md-step>

        <md-step id="second" md-label="Second Step" :md-editable="false" :md-done.sync="second">
          <step-two-container v-on:others="setData"></step-two-container>
          <md-button class="md-raised md-primary" v-on:click="setDone('second', 'third')">Edasi</md-button>
        </md-step>

        <md-step id="third" md-label="Third Step" :md-editable="false" :md-done.sync="third">
          <step-three-container></step-three-container>
          <md-button class="md-raised md-primary" v-on:click="setDone('third', 'fourth')">Edasi</md-button>
        </md-step>

        <md-step id="fourth" md-label="Fourth Step" :md-editable="false" :md-done.sync="fourth">
          <step-four-container :data_about_others="this.dataAboutOthers"></step-four-container>
          <md-button class="md-raised md-primary" v-on:click="setDone('fourth', 'fourth')">Esita</md-button>
        </md-step>
      </md-steppers>
    </div>
  </div>
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
