<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Täiendavad andmed</div>
        </md-card-header>

        <md-card-content>
          <md-tabs class="md-primary" md-alignment="centered">
            <md-tab id="tab-a" md-label="Andreas S">
              A
            </md-tab>
            <md-tab id="tab-p" md-label="Peeter M">
              P
            </md-tab>
            <md-tab id="tab-j" md-label="Juhan N">
              J
            </md-tab>
          </md-tabs>
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
        firstName: null,
        lastName: null,
        email: null,
        idcode: null,
        phone: null,
        address: null,
        dataOnlyAboutMe: true,
        existUnderAgeChildren: true,
        otherParentFirstName: null,
        otherParentLastName: null,
        otherParentIdCode: null,
        owners: [
          {firstName: null, lastName: null, idcode: null}
        ]
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
      }
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
