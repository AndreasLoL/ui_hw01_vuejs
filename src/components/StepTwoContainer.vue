<template>

  <form novalidate class="md-layout" @submit.prevent="validateUser">
    <md-card class="md-layout-item md-size-100 md-small-size-100">
      <md-card-header>
        <div class="md-title">RUUMI KASUTAMISE ÕIGUS</div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-gutter">
          <md-list>
            <md-list-item>
              <md-radio v-model="form.radio" value="0">Olen ruumi (kaas)omanik</md-radio>
            </md-list-item>
            <md-list-item>
              <md-radio v-model="form.radio" value="1">Lisan üürilepingu</md-radio>
            </md-list-item>
            <md-list-item>
              <md-radio v-model="form.radio" value="2">Ruumi kasutamise muu alus</md-radio>
            </md-list-item>
            <md-list-item>
              <md-radio v-model="form.radio" value="3">Ruumi omanik annab elukohateatele nõusoleku</md-radio>
            </md-list-item>
          </md-list>
        </div>
      </md-card-content>
    </md-card>

    <md-card class="md-layout-item md-size-100 md-small-size-100" v-if="form.radio==='3'">
      <md-card-header>
        <div class="md-title">RUUMI OMANIKU NÕUSOLEK</div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('firstName')">
              <label for="first-name">Eesnimi</label>
              <md-input name="first-name" id="first-name" autocomplete="given-name"
                        v-model="form.firstName" :disabled="sending"/>
              <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
              <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('lastName')">
              <label for="last-name">Perekonnanimi</label>
              <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName"
                        :disabled="sending"/>
              <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
              <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
            </md-field>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('idcode')">
              <label for="idcode">Isikukood</label>
              <md-input type="number" name="idcode" id="idcode" autocomplete="idcode" v-model="form.idcode"
                        :disabled="sending"/>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-progress-bar md-mode="indeterminate" v-if="sending"/>
          </div>
        </div>

      </md-card-content>
    </md-card>


    <md-card class="md-layout-item md-size-100 md-small-size-100">

      <md-checkbox v-model="differentAddress"> Elan mujal kui eelmises punktis nimetatud elukohas</md-checkbox>

      <md-card-header v-if="differentAddress">
        <div class="md-title">PALUN NIMETAGE SEE SIDE AADRESSINA</div>
      </md-card-header>
      <md-card-content v-if="differentAddress">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <custom-auto-complete></custom-auto-complete>
          </div>
        </div>
      </md-card-content>
    </md-card>

    <md-card class="md-layout-item md-size-100 md-small-size-100">
      <md-checkbox v-model="additionalFiles" v-if="form.radio !=='1'"> Lisan elukohateatele täiendavaid dokumente</md-checkbox>
      <md-card-header v-if="form.radio ==='1' || additionalFiles">
        <div class="md-title">ELUKOHATEATELE LISATAVAD DOKUMENDID</div>
      </md-card-header>
      <md-card-content v-if="form.radio ==='1' || additionalFiles">
        <div class="md-layout md-gutter">
          <md-field>
            <label>Lisatavad failid</label>
            <md-file v-model="multiple" multiple/>
          </md-field>
        </div>
      </md-card-content>

    </md-card>


  </form>

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
    mixins: [validationMixin],
    data: () => ({
      form: {
        firstName: "",
        lastName: "",
        idcode: "",
        radio: '0',

      },
      userSaved: false,
      sending: false,
      lastUser: null,
      differentAddress: false,
      additionalFiles: false

    }),
    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        lastName: {
          required,
          minLength: minLength(3)
        },
      }
    },
    methods: {
      getValidationClass(fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      saveUser() {
        this.sending = true;

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.lastUser = `${this.form.firstName} ${this.form.lastName}`;
          this.userSaved = true;
          this.sending = false;
          this.clearForm()
        }, 1500)
      },
      validateUser() {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      },

    },
    components: {
      CustomAutoComplete, 'vue-google-autocomplete': VueGoogleAutocomplete,
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
