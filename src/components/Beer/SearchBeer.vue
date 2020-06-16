<template>
  <v-card>
    <v-card-title>
      Znajdź piwo:
      <v-spacer/>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="searchBeer">
        <v-text-field  clearable v-model="searchByName"  placeholder="Podaj nazwę">
        </v-text-field>
        <v-expansion-panels flat >
          <v-expansion-panel>
            <v-expansion-panel-header>Więcej opcji</v-expansion-panel-header>
            <v-expansion-panel-content>
              <BeerTypeSelector v-model="beerType"  label="Gatunek piwa" />
              <BrewerySelector v-model="brewery"  label="Browar" />
              <v-row class="py-0">
                <v-col class="py-0">
                  <v-radio-group v-model="sort" class="my-0">
                    Sortowanie:
                    <v-radio value="createdDate" label="Data dodania"></v-radio>
                    <v-radio value="name" label="Alfabetycznie"></v-radio>
                    <v-radio value="avgRating" label="Średnia ocen"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col class="py-0">
                  <v-radio-group v-model="sortDir" class="my-0">
                    Kierunek:
                    <v-radio :value="1" label="Rosnąco"></v-radio>
                    <v-radio :value="-1" label="Malejąco"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-btn rounded color="secondary" @click="clearSearchFields">
                Wyszyść
              </v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-btn rounded block color="primary" type="submit" :disabled="loading">
          Szukaj
        </v-btn>
      </v-form>

      <BeerList :beers="searchResult" @deleteBeer="deleteBeer" @editBeer="editBeer" :loading="loading" class="mt-2"/>
    </v-card-text>
  </v-card>
</template>

<script>
import BeerList from "./BeerList";
import BeerTypeSelector from "./BeerTypeSelector";
import BrewerySelector from "../Brewery/BrewerySelector";
export default {
  name: "SearchBeer",
  components: { BeerList, BeerTypeSelector,BrewerySelector },
  data() {
    return {
      searchResult: [],
      searchByName: "",
      beerType: [],
      brewery: {},
      loading: false,
      sort: "createdDate",
      sortDir:1
    };
  },
  created() {
    if(this.$route.query.beer_type)
      this.beerType=[JSON.parse(this.$route.query.beer_type)];
    this.searchBeer();
  },
  methods: {
    async searchBeer() {
      // eslint-disable-next-line no-unused-vars,no-undef
      this.loading=true;
      let response = null;
      let query = "api/beers/?";

      if(this.searchByName)
         query = query+`&name=${this.searchByName}`;
      if(this.brewery && this.brewery._id)
        query = query+`&brewery=${this.brewery._id}`;
      if(this.beerType.length)
        query = query+`&beerType=${JSON.stringify(this.beerType.map(x=>x._id))}`;
      query+=`&sort=${this.sort}&sortDir=${this.sortDir}`;

      response= await this.$http.get(query);
      this.searchResult = response.data;
      this.loading=false;
    },
    async deleteBeer(id){
      try{
        await this.$http.delete(`api/beers/${id}`);
        this.searchBeer();
      }
      catch(e){
        console.log(e);
      }
    },
     editBeer(beer){
      this.$refs.beerModal.open(beer);
    },
    clearSearchFields(){
      this.searchByName=""
      this.beerType=[]
      this.brewery={}
      this.sort="createdDate"
      this.sortDir=1
    }
  }
};
</script>

<style scoped></style>
