<template>
  <div>
    <form novalidate class="md-layout">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Õigused</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">

            </div>
          </div>

          <md-list>
            <md-list-item>
              <md-radio v-model="form.permission" value="0">Olen ruumi (kaas)omanik</md-radio>
            </md-list-item>
            <md-list-item>
              <md-radio v-model="form.permission" value="1">Lisan üürilepingu</md-radio>
            </md-list-item>
            <md-list-item>
               <md-radio v-model="form.permission" value="2">Ruumi kasutamise muu alus</md-radio>
            </md-list-item>
            <md-list-item>
              <md-radio v-model="form.permission" value="3">Ruumi omanik annab elukohateatele nõusoleku</md-radio>
            </md-list-item>
          </md-list>

          <div v-if="form.permission === '3'">
            Ruumi omaniku nõusolek

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="first-name">Eesnimi</label>
                  <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName"
                            :disabled="sending"/>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="last-name">Perekonnanimi</label>
                  <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName"
                            :disabled="sending"/>
                </md-field>
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="idcode">Isikukood</label>
                    <md-input name="idcode" id="idcode" autocomplete="email" v-model="form.idcode" :disabled="sending"/>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100"></div>
              </div>
            </div>
          </div>
        </md-card-content>
      </md-card>

    </form>
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
        permission: "0",
        other: "",
        firstName: "",
        lastName: "",
        idcode: ""
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    methods: {
      getValidationClass(fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },

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
