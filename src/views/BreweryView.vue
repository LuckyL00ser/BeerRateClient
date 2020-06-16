<template>
    <v-container>
        <v-row>
            <v-col class="col-lg-8 col-12">
                <v-row>
                    <v-col>
                        <BreweryModal @breweriesListEdited="getBrewery" :hidden="true" ref="breweryModal"/>
                        <BreweryDetails :brewery="brewery" @editBrewery="editBrewery" @deleteBrewery="deleteBrewery" :loading="breweryLoading" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card>
                            <v-card-title>
                                Piwa z tego browaru:
                            </v-card-title>
                            <v-card-text>
                                <BeerList :beers="beers" :loading="beersLoading"/>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col class="col-lg-4 col-12">
                <OpinionsList :target-object-id="$route.params.id"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import BeerList from "../components/Beer/BeerList";
    import BreweryDetails from "../components/Brewery/BreweryDetails";
    import BreweryModal from "../components/Brewery/BreweryModal";
    import OpinionsList from "../components/Opinions/OpinionsList";
    export default {
        name: "BreweryView",
        components: {OpinionsList, BreweryModal, BeerList,BreweryDetails},
        data(){
            return{
                beers: [],
                brewery: {},
                beersLoading:false,
                breweryLoading:false
            }
        },
        methods:{
          async getBreweryBeers(){
              this.beersLoading=true;
              try{
                  const response = await this.$http.get(`api/beers/?brewery=${this.$route.params.id}`)
                  this.beers = response.data;
              }
              catch(e){
                  this.$store.toast.error(`Podczas ładowania listy piw wystąpił błąd - ${e.response.data.message}`,{duration:4000, position: "bottom-right"})
              }
              this.beersLoading=false;
          },
            async getBrewery(){
              this.breweryLoading=true;
                try{
                    const response = await this.$http.get(`api/breweries/${this.$route.params.id}`)
                    this.brewery = response.data;
                }
                catch(e){
                    this.$store.toast.error(`Podczas ładowania danych browaru wystąpił błąd - ${e.response.data.message}`,{duration:4000, position: "bottom-right"})
                }
                this.breweryLoading=false;
            },
            async deleteBrewery(){
                try{
                    await this.$http.delete(`/api/breweries/${this.brewery._id}`);
                    this.$router.push('/breweries')
                    this.$store.toast.info('Usunięto browar',{duration:4000, position: "bottom-right"})

                }
                catch(e){
                    this.$store.toast.error(`Podczas usuwania browaru wystąpił błą - ${e.response.data.message}`,{duration:4000, position: "bottom-right"})
                }
            },
            editBrewery(){
                this.$refs.breweryModal.open(this.brewery);
            }
        },
        mounted() {
            this.getBrewery();
            this.getBreweryBeers();
        }
    }
</script>

<style scoped>

</style>
