<template>
    <v-container>
        <v-row v-if="$store.state.isLoggedIn">
            <v-col class="mx-auto col-12 col-md-6">
                <v-card  >
                <v-card-text class="d-flex justify-space-between align-center">
                    <h2>Nie znalazłeś czego szukasz?</h2>
                    <BeerModal ref="beerModal" :hidden="!$store.state.isLoggedIn" @beerListEdited="searchBeer"/>
                </v-card-text>
            </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="mx-auto col-12 col-md-6">
                <SearchBeer ref="list"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import SearchBeer from "../components/Beer/SearchBeer";
    import BeerModal from "../components/Beer/BeerModal";
    export default {
        name: "Search",
        components: {BeerModal, SearchBeer},
        methods: {
            searchBeer(){
                this.$refs.list.searchBeer();
            }
        }
    }
</script>

<style scoped>

</style>
