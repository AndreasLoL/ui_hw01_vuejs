<template>
  <div>
    <div class="segment-title">
      Uus elukoht
    </div>
    <div class="segment">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <custom-auto-complete label="Uue elukoha aadress"></custom-auto-complete>
            </div>
          </div>

          <div class="start-content">
            <md-checkbox v-model="form.dataAboutMe">Esitan uue elukoha enda kohta</md-checkbox>
          </div>

          <div class="start-content">
            <md-checkbox v-model="form.dataAboutOthers" v-on:change="dataAboutOthersChange">Esitan uue elukoha teis(te)e kohta</md-checkbox>
          </div>

        </md-card-content>
      </md-card>
    </div>

    <div class="segment-title">
      Muu elukoht
    </div>
    <div class="segment">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-content>
          <div class="start-content wrapper">
            <md-checkbox v-model="form.liveElsewhere">Elan ka mujal kui eelnevalt nimetatud elukohas</md-checkbox>
          </div>

          <transition name="fade" mode="out-in">
            <div v-if="form.liveElsewhere" class="wrapper">
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <custom-auto-complete label="Täpne sideaadress"></custom-auto-complete>
                </div>
              </div>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-datepicker v-model="form.dateFrom">
                    <label>Kehtib alates</label>
                  </md-datepicker>
                </div>

                <div class="md-layout-item md-small-size-100">
                  <md-datepicker v-model="form.dateTo">
                    <label>Kuni</label>
                  </md-datepicker>
                </div>
              </div>
              <span class="md-helper-text">Täita juhul, kui aadressi kehtivuse alguse kuupäev on tulevikus või kui on teada, millal kehtivus lõppeb</span>
            </div>
          </transition>

          <md-button class="md-raised md-primary" v-on:click="validateAndNext">Edasi</md-button>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
  import {validationMixin} from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import CustomAutoComplete from "./CustomAutoComplete"

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      form: {
        dataAboutMe: false,
        dataAboutOthers: false,
        liveElsewhere: false,
        dateFrom: new Date(),
        dateTo: new Date()
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    methods: {
      validateAndNext() {
        this.$emit('complete');
      },
      dataAboutOthersChange() {
        this.$emit('others', "dataAboutOthers", this.form.dataAboutOthers);
      }

    },
    components: {
      'custom-auto-complete': CustomAutoComplete
    }
  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  .md-layout.md-gutter {
    margin-left: 0px;
    margin-right: 0px;
  }

  .md-card:not(:first-child) {
    margin-top: 20px;
  }

  .md-switch-front {
    margin: 16px 16px 16px 0;
    cursor: pointer;
    line-height: 20px;
  }

  .choice {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .float-right {
    float: right;
  }

</style>
