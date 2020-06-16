<template>
  <v-card>
    <v-card-title>
      Znajdź browar:
      <v-spacer/>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="searchBrewery">
        <v-text-field
          clearable
          placeholder="Podaj nazwę"
          v-model="searchByName"
          append-outer-icon="fas fa-search"
          @click:click:append-outer="searchBrewery"
        >
        </v-text-field>
        <v-btn rounded block :disabled="loading" type="submit" color="primary">
          Szukaj
        </v-btn>
      </v-form>
      <div class="position-relative mt-2">

        <loader :loading="loading"/>
        <v-list v-if="searchResult.length">
          <v-list-item-group v-model="item">
            <v-list-item
                    two-line
                    v-for="brewery in searchResult"
                    :key="brewery._id"
                    :to="`/breweries/${brewery._id}`"
            >
                <AvatarImage
                        :url="brewery.image == null ? require('@/assets/brewery.jpg' ): brewery.image"
                        small="true"
                        class="mr-3"
                />
              <v-list-item-content>
                <v-list-item-title>{{ brewery.name }}</v-list-item-title>
                <v-list-item-subtitle
                >Adres:
                  {{
                  brewery.address ? brewery.address : "Nieznany"
                  }}</v-list-item-subtitle
                >
              </v-list-item-content>
              <v-list-item-action class="flex-row" v-if="$store.state.isLoggedIn">

              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <h2 class="text-center py-4" v-else>Brak browarów</h2>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Loader from "../Loader";
import AvatarImage from "../AvatarImage";
export default {
	name: "SearchBrewery",
  components: {AvatarImage, Loader},
  data() {
    return {
      searchResult: [],
      searchByName: "",
      loading: false,
      item: null,
    };
  },
  created() {
	  this.searchBrewery();
  },
  methods: {
    async searchBrewery() {
      // eslint-disable-next-line no-unused-vars,no-undef
      this.loading = true;
      let response = null;
      if(this.searchByName!="")
        response= await this.$http.get(`api/breweries/?name=${this.searchByName}`);
      else
        response= await this.$http.get('api/breweries');
      this.searchResult = response.data;
      this.loading = false;
    },
  }
};
</script>
