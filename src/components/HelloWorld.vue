<template>
  <div class="hello">
    <div>
      <md-steppers md-vertical md-linear :md-active-step.sync="active">
        <md-step id="first" md-label="First Step" md-description="Optional" :md-editable="false" :md-done.sync="first">
          <step-one-container></step-one-container>
          <md-button class="md-raised md-primary" v-on:click="setDone('first', 'second')">Edasi</md-button>
        </md-step>

        <md-step id="second" md-label="Second Step" :md-editable="false" :md-done.sync="second">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        </md-step>

        <md-step id="third" md-label="Third Step" :md-editable="false" :md-done.sync="third">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        </md-step>
      </md-steppers>
    </div>
  </div>
</template>

<script>

import StepOneContainer from "./StepOneContainer";
export default {
  name: 'HelloWorld',
  data: () => ({
    first: false,
    second: false,
    third: false,
    active: "first"
  }),
  methods: {
    setDone (id, index) {
      this[id] = true;

      if (index) {
        this.active = index
      }
    },
  },
  components: {
    'step-one-container': StepOneContainer
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
