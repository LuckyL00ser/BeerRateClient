<template>
    <v-card>
        <loader :loading="loading"/>
            <v-card-text >
                <v-row>
                    <v-col class="col-12 col-sm-auto d-flex">
                        <AvatarImage class="mx-auto" :url="beer.image?beer.image:require('@/assets/beer.jpg')"/>
                    </v-col>
                    <v-col class="flex-sm-grow-1 col-12 col-sm-auto">
                        <v-row>
                            <v-col class="col-12 col-sm-8">
                                <v-card-title class="pa-0">
                                    {{beer.name}}
                                </v-card-title>
                                <p>Rodzaj:
                                    <v-chip v-for="type in beer.beerType" :key="type._id">
                                        {{type.name}}
                                    </v-chip>
                                </p>
                                <p>Zawartość alkoholu: {{beer.alcoholPercentage?beer.alcoholPercentage:'brak informacji'}}%</p>

                                <p>Goryczka (IBU): {{beer.IBU?beer.IBU:'brak informacji'}}</p>
                                <p v-if="beer.user">Dodał:
                                    <router-link to="`/users/${creator._id}`" >
                                        {{beer.user.username}}
                                    </router-link>
                                </p>

                                <p>Browar: <router-link v-if="beer.brewery" :to="`/breweries/${beer.brewery._id}`">
                                    {{beer.brewery.name}}</router-link>
                                    <span v-else>nieznany</span>
                                </p>
                            </v-col>
                            <v-col class="col-12 col-sm-4">
                                Średnia ocena:
                                <star-rating v-if="beer.avgRating" :star-size="20" :read-only="true" v-model="beer.avgRating" :round-start-rating="false" :increment="0.01" :fixed-points="2"/>
                                <p v-else>brak ocen</p>
                                <span >
                                    <v-btn icon color="danger" @click="$emit('deleteBeer')" v-if="canEdit">
                                        <v-icon>
                                            fas fa-trash
                                        </v-icon>
                                    </v-btn>
                                    <v-btn icon color="info" @click="$emit('editBeer')" v-if="canRemove">
                                        <v-icon>
                                            fas fa-pen
                                        </v-icon>
                                    </v-btn>
                                </span>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>

            </v-card-text>
        <div class="px-4 pb-4">
            <h3>Opis:</h3>
            {{beer.description}}
        </div>

    </v-card>
</template>

<script>
    import StarRating from 'vue-star-rating'
    import Loader from "../Loader";
    import AvatarImage from "../AvatarImage";
    export default {
        name: "BeerDetails",
        components: {AvatarImage, Loader, StarRating},
        props: ['beer','loading'],
        computed: {
            canEdit(){
                return this.beer && this.$store.state.isLoggedIn && ( this.beer.user && this.$store.state.user._id === this.beer.user._id || this.$store.state.user.userRole ==='admin' || this.beer.brewery && this.beer.brewery.user === this.$store.state.user._id)
            },
            canRemove(){
                return this.beer && this.$store.state.isLoggedIn && (this.beer.user && this.$store.state.user._id === this.beer.user._id || this.$store.state.user.userRole==='admin' || this.beer.brewery && this.beer.brewery.user === this.$store.state.user._id)
            }
        }
    }
</script>

<style scoped>
 .beer-image{
     width:200px;
 }
</style>
