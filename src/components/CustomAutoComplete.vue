<template>
  <div class="wrapper-element">
    <md-autocomplete v-model="address" :md-options="this.addresses" @md-opened="getAddresses" @md-changed="getAddresses" @md-selected="selected">
      <label>Uus aadress</label>

      <template slot="md-autocomplete-item" slot-scope="{ item, term }">
        <md-highlight-text :md-term="term">{{ item.name }}</md-highlight-text>
      </template>

      <template slot="md-autocomplete-empty" slot-scope="{ term }">
        Sellist aadressi ei leitud
      </template>
    </md-autocomplete>
  </div>
</template>

<script>

  export default {
    name: 'CustomAutoComplete',
    data: () => ({
      addresses: [],
      address: "",
      service: null,
    }),
    components: {

    },
    mounted: function () {
      this.service = new google.maps.places.AutocompleteService();
    },
    methods: {
      selected(item) {
        this.address = item.name;
      },
      getAddresses (searchTerm) {
        let that = this;
        if (searchTerm && this.service) {
          this.service.getPlacePredictions({
            input: searchTerm,
            componentRestrictions: {country: 'ee'}
          }, function(data) {
            if(!data) {
              data = []
            }
            data = data.map(item => {
              return {name: item.description, id: item.id}
            });
            that.addresses = data ? data : [];
          })
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  .wrapper-element {
    position: relative;
  }
</style>
