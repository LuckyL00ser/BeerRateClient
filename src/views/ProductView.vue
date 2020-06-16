<template>
    <v-container>
        <v-row>
            <v-col class="col-12 col-lg-8 mx-auto" >
                <BeerModal @beerListEdited="getBeer" :hidden="true" ref="beerModal"/>
                <BeerDetails :beer="beer" @deleteBeer="deleteBeer" @editBeer="editBeer" :loading="loading"/>
            </v-col>
            <v-col class="col-lg-8 mx-auto">
                <opinions :target-object-id="$route.params.id"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import BeerDetails from "../components/Beer/BeerDetails";
    import BeerModal from "../components/Beer/BeerModal";
    import Opinions from "../components/Opinions/OpinionsList";
    export default {
        name: "ProductView",
        components: {Opinions, BeerModal, BeerDetails},
        data(){
            return {
                beer: {},
                loading:false
            }
        },
        created() {
            this.getBeer();
        },
        methods:{
            async getBeer(){
                try{
                    this.loading=true;
                    const response = await this.$http.get(`/api/beers/${this.$route.params.id}`)
                    this.beer =response.data;
                }
                catch(e){
                    this.$store.toast.error(`Podczas ładowania danych o piwie wystąpił błąd - ${e.response.data.message}`,{duration:4000, position: "bottom-right"})
                }
                this.loading=false;
            },
            async deleteBeer(){
                try{
                    this.loading=true;
                    await this.$http.delete(`/api/beers/${this.beer._id}`);
                    this.$store.toast.info('Usunięto piwo',{duration:4000, position: "bottom-right"})
                    this.$router.push('/search')
                }
                catch(e){
                    this.$store.toast.error(`Podczas usuwania piwa wystąpił błąd - ${e.response.data.message}`,{duration:4000, position: "bottom-right"})
                }
                this.loading=false;
            },
            editBeer(){
                this.$refs.beerModal.open(this.beer);
            }
        }

    }
</script>

<style scoped>

</style>
