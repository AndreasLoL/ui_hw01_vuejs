<template>
  <div>
    <form novalidate class="md-layout">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title"><span v-if="data_about_others">Teised isikud</span><span v-else>Elukohateatele lisatavad dokumendid</span></div>
        </md-card-header>

        <md-card-content>
          <div class="users" v-for="(row, index) in form.users" v-if="data_about_others">
            <div>
              <md-subheader>{{index + 1}}.</md-subheader>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="first-name">Eesnimi</label>
                    <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="row.firstName"
                              :disabled="sending"/>
                  </md-field>
                </div>


                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="last-name">Perekonnanimi</label>
                    <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="row.lastName"
                              :disabled="sending"/>
                  </md-field>
                </div>
              </div>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="idcode">Isikukood</label>
                    <md-input name="idcode" id="idcode" autocomplete="id-code" v-model="row.idcode"
                              :disabled="sending"/>
                  </md-field>
                </div>

                <div class="md-layout-item md-small-size-100">
                  <md-checkbox v-model="row.underage">Alaealine</md-checkbox>
                </div>
              </div>

              <div class="start-content">
                <md-checkbox v-model="row.fromOutside">Saabun välismaalt</md-checkbox>
              </div>

              <div class="md-layout md-gutter" v-if="row.fromOutside">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="foreign_home">Eelmine välismaa elukoht</label>
                    <md-input name="foreign home" id="foreign_home" autocomplete="text" v-model="row.foreignHome" :disabled="sending"/>
                  </md-field>
                </div>

                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="foreign_code">Välisriigi isikukood olemasolul</label>
                    <md-input type="number" id="foreign_code" name="foreign_code" autocomplete="foreign-home" v-model="row.foreignCode"
                              :disabled="sending"/>
                  </md-field>
                </div>
              </div>

              <div><additional-data :email_and_phone="true"></additional-data></div>

              <div class="md-layout">
                <div class="md-layout-item md-size-100">
                  <md-button class="md-accent float-right" v-if="index !== 0" @click="form.users.splice(index, 1);">Kustuta rida</md-button>
                </div>
              </div>

            </div>
          </div>
          <md-button class="md-primary" v-if="form.users.length < 4 && data_about_others" @click="form.users.push({firstName: null, lastName: null, idcode: null, underage: false, fromOutside: false, foreignCode: null, foreignHome: null})">Lisa isik <md-icon class="md-size-05">add</md-icon></md-button>

          <div v-if="underage() > 0">
            Alaealise <span v-if="underage() === 1">lapse</span><span v-if="underage() !== 1">laste</span> teise hooldusõigusliku vanema nõusolek

            <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="first-name">Eesnimi</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.parentFirstName"
                          :disabled="sending"/>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="last-name">Perekonnanimi</label>
                <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.parentLastName"
                          :disabled="sending"/>
              </md-field>
            </div>
          </div>
            <div class="md-layout md-gutter">
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="idcode">Isikukood</label>
                    <md-input name="idcode" id="idcode" autocomplete="idcode" v-model="form.parentIdCode" :disabled="sending"/>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100"></div>
              </div>
            </div>
          </div>

          <div class="md-title" v-if="data_about_others">Elukohateatele lisatavad dokumendid</div>
          <div class="md-layout md-gutter">
            <md-field>
              <label>Lisatavad failid</label>
              <md-file v-model="form.multiple" multiple/>
            </md-field>
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
  import AdditionalData from "./AdditionalData"

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    props: ["data_about_others"],
    data: () => ({
      form: {
        users: [
          {firstName: null, lastName: null, idcode: null, underage: false, fromOutside: false, foreignCode: null, foreignHome: null}
        ],
        dataAboutOthers: true,
        multiple: null,
        parentIdCode: null,
        parentLastName: null,
        parentFirstName: null
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
      underage() {
        return this.form.users.filter(item => item.underage).length;
      }
    },
    components: {
      AdditionalData, 'custom-auto-complete': CustomAutoComplete,
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
