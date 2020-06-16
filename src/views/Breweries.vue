<template>
    <v-container>
        <v-row v-if="canAdd">
            <v-col class="mx-auto col-12 col-md-6">
                <v-card  >
                    <v-card-text class="d-flex justify-space-between align-center">
                        <h2>Nie znalazłeś czego szukasz?</h2>

                        <BreweryModal @breweriesListEdited="searchBrewery" :hidden="!canAdd" ref="breweryModal"/>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="mx-auto col-12 col-md-6">
                <SearchBrewery ref="breweries"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import SearchBrewery from "../components/Brewery/SearchBrewery";
    import BreweryModal from "../components/Brewery/BreweryModal";
    export default {
        name: "Breweries",
        components: {BreweryModal, SearchBrewery},
        computed:{
            canAdd(){
                return this.$store.state.isLoggedIn && (this.$store.state.user.userRole === 'breweryOwner' || this.$store.state.user.userRole ==='admin');
            }
        },
        methods: {
            searchBrewery(){
                this.$refs.breweries.searchBrewery();
            }
        }
    }
</script>

<style scoped>

</style>
