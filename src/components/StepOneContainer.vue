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
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">Perekonnanimi</label>
                <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('email')">
                <label for="email">E-post</label>
                <md-input name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('phone')">
                <label for="phone">Telefon</label>
                <md-input type="number" id="phone" name="phone" autocomplete="age" v-model="form.phone" :disabled="sending" />
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('idcode')">
                <label for="idcode">Isikukood</label>
                <md-input type="number" name="idcode" id="idcode" autocomplete="idcode" v-model="form.idcode" :disabled="sending" />
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-progress-bar md-mode="indeterminate" v-if="sending" />
            </div>
          </div>

        </md-card-content>
      </md-card>

      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">UUE ELUKOHA ANDMED</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstName')">
                <label for="first-name">Eesnimi</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
                <custom-auto-complete></custom-auto-complete>
            </div>

            <div class="md-layout-item md-size-100 md-small-size-100">
              <div class="choice">
                <span class="md-switch-front" v-on:click="choiceChange(form, 'dataOnlyAboutMe', false)">Esitan uue elukoha enda kohta</span>
                <md-switch v-model="form.dataOnlyAboutMe"></md-switch>
                <span class="md-switch-front" v-on:click="choiceChange(form, 'dataOnlyAboutMe', true)">Esitan uue elukoha teis(t)e kohta</span>
              </div>
            </div>
          </div>

        </md-card-content>
      </md-card>

      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">TEISED ISIKUD, KELLE ELUKOHA AADRESSI MUUDETAKSE</div>
        </md-card-header>

        <md-card-content>
          <div class="owners" v-for="(row, index) in form.owners">
              <md-subheader>{{index + 1}}.</md-subheader>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('firstName')">
                    <label for="first-name">Eesnimi</label>
                    <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="row.firstName" :disabled="sending" />
                  </md-field>
                </div>

                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('lastName')">
                    <label for="last-name">Perekonnanimi</label>
                    <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="row.lastName" :disabled="sending" />
                  </md-field>
                </div>
              </div>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="idcode">Isikukood</label>
                    <md-input name="first-name" id="first-name" autocomplete="id-code" v-model="row.idcode" :disabled="sending" />
                  </md-field>
                </div>

                <div class="md-layout-item md-small-size-100">
                  <md-button class="md-accent float-right" v-if="index !== 0" v-on:click="removeRow(index)">Kustuta rida</md-button>
                </div>
              </div>

            <md-divider v-if="form.owners.length > 1"></md-divider>

          </div>

          <md-button class="md-primary" v-if="form.owners.length < 9" v-on:click="addRow()">Lisa</md-button>

        </md-card-content>
      </md-card>


    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
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
        email: {
          required,
          email
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.firstName = null
        this.form.lastName = null
        this.form.age = null
        this.form.gender = null
        this.form.email = null
      },
      saveUser () {
        this.sending = true

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.lastUser = `${this.form.firstName} ${this.form.lastName}`
          this.userSaved = true
          this.sending = false
          this.clearForm()
        }, 1500)
      },
      validateUser () {
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
