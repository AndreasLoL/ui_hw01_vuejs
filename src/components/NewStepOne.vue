<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">ESITAJA</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstName')">
                <label for="first-name">Eesnimi</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName"
                          :disabled="sending"/>
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
              <md-field :class="getValidationClass('email')">
                <label for="email">E-post</label>
                <md-input name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending"/>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('phone')">
                <label for="phone">Telefon</label>
                <md-input type="number" id="phone" name="phone" autocomplete="age" v-model="form.phone"
                          :disabled="sending"/>
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

          <div class="start-content">
            <md-checkbox v-model="form.fromOutside">Saabun välismaalt</md-checkbox>
          </div>

          <div class="md-layout md-gutter" v-if="form.fromOutside">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="foreign_home">Eelmine välismaa elukoht</label>
                <md-input name="foreign home" id="foreign_home" autocomplete="text" v-model="form.foreignHome" :disabled="sending"/>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="foreign_code">Välisriigi isikukood olemasolul</label>
                <md-input type="number" id="foreign_code" name="foreign_code" autocomplete="foreign-home" v-model="form.foreignCode"
                          :disabled="sending"/>
              </md-field>
            </div>
          </div>

          <additional-data :mail_and_phone="false"></additional-data>

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
  import AdditionalData from "./AdditionalData"

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      form: {
        firstName: null,
        lastName: null,
        email: null,
        idcode: null,
        phone: null,
        foreignHome: null,
        foreignCode: null,
        fromOutside: false,
      },
      userSaved: false,
      sending: false,
      lastUser: null
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
        otherParentFirstName: {
          required,
          minLength: minLength(3)
        },
        otherParentLastName: {
          required,
          minLength: minLength(3)
        },
        email: {
          required,
          email
        }
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
      clearForm() {
        this.$v.$reset()
        this.form.firstName = null
        this.form.lastName = null
        this.form.age = null
        this.form.gender = null
        this.form.email = null
        this.form.otherParentsFirstName = null
        this.form.otherParentsLastName = null
      },
      saveUser() {
        this.sending = true

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.lastUser = `${this.form.firstName} ${this.form.lastName}`
          this.userSaved = true
          this.sending = false
          this.clearForm()
        }, 1500)
      },
      validateUser() {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      },
      choiceChange(element, name, status) {
        element[name] = status;
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
