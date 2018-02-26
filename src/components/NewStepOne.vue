<template>
  <div>
    <div class="segment-title">ESITAJA</div>
    <div class="segment">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-content>
          <div class="wrapper">
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('firstName')">
                  <label for="first-name">Eesnimi</label>
                  <md-input name="first-name" id="first-name" autocomplete="given-name" v-model.trim="form.firstName"/>
                  <span class="md-error" v-if="!$v.form.firstName.required">Eesnimi ei või olla tühi</span>
                </md-field>


              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('lastName')">
                  <label for="last-name">Perekonnanimi</label>
                  <md-input name="last-name" id="last-name" autocomplete="family-name" v-model.trim="form.lastName"/>
                  <span class="md-error" v-if="!$v.form.lastName.required">Perekonnanimi ei või olla tühi</span>
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('email')">
                  <label for="email">E-post</label>
                  <md-input name="email" id="email" autocomplete="email" v-model.trim="form.email"/>
                  <span class="md-error" v-if="!$v.form.email.required">E-posti aadress ei või olla tühi</span>
                  <span class="md-error" v-if="!$v.form.email.email">Sisestage korrektne e-posti aadress</span>
                </md-field>

              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('phone')">
                  <label for="phone">Telefon</label>
                  <md-input type="number" id="phone" name="phone" autocomplete="phone" v-model.trim="form.phone"/>
                  <span class="md-error" v-if="!$v.form.phone.required">Telefoni number ei tohi olla tühi</span>
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('idcode')">
                  <label for="idcode">Isikukood</label>
                  <md-input type="number" name="idcode" id="idcode" autocomplete="idcode" v-model.trim="form.idcode"/>
                  <span class="md-error" v-if="!$v.form.idcode.validateIdCode">Sisestage korrektne isikukood</span>
                </md-field>

              </div>

              <div class="md-layout-item md-small-size-100"></div>
            </div>
          </div>

          <div class="wrapper">
            <div class="start-content">
              <md-checkbox v-model="form.fromOutside">Saabun välismaalt</md-checkbox>
            </div>
            <div class="md-layout md-gutter" v-if="form.fromOutside">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('foreignHome')">
                  <label for="foreign_home">Eelmine välismaa elukoht</label>
                  <md-input name="foreign home" id="foreign_home" autocomplete="text" v-model="form.foreignHome"/>
                  <span class="md-error" v-if="!$v.form.foreignHome.customRequired">Välismaa elukoha aadress ei tohi tühi olla</span>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="foreign_code">Välisriigi isikukood olemasolul</label>
                  <md-input type="number" id="foreign_code" name="foreign_code" autocomplete="foreign-home"
                            v-model="form.foreignCode"/>
                </md-field>
              </div>
            </div>

          </div>


          <additional-data :mail_and_phone="false"></additional-data>

          <md-button class="md-raised md-primary" v-on:click="validateAndNext">Edasi</md-button>

        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'
  import {validationMixin} from 'vuelidate'


  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import CustomAutoComplete from "./CustomAutoComplete"
  import AdditionalData from "./AdditionalData"
  import {validateIdCode} from "../utils/validation";

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      form: {
        firstName: '',
        lastName: '',
        email: '',
        idcode: '',
        phone: '',
        foreignHome: null,
        foreignCode: null,
        fromOutside: false,
      }
    }),
    validations: {
      form: {
        foreignHome: {
          customRequired(value) {
            return !(this.form.fromOutside && (!value || !value.trim()));
          }
        },
        idcode: {
          required,
          validateIdCode
        },
        firstName: {
          required
        },
        lastName: {
          required
        },
        email: {
          required,
          email
        },
        phone: {
          required
        },
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName];

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      validateAndNext() {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.$emit('complete');
        }
      },
      addRow() {
        this.form.owners.push({firstName: null, lastName: null, idcode: null});
      },
      removeRow(index) {
        this.form.owners.splice(index, 1);
      },
    },
    components: {
      'custom-auto-complete': CustomAutoComplete,
      "additional-data": AdditionalData
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
