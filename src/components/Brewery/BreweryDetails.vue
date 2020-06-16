<template>
    <v-card>
        <loader :loading="loading"/>
        <v-card-text>
            <v-card-title>
                <h1>Browar:</h1>
            </v-card-title>
            <v-row>
                <v-col class="col-12 col-sm-auto d-flex">
                    <img class="brewery-image mx-auto" :src="brewery.image?brewery.image:require('@/assets/brewery.jpg')"/>
                </v-col>
                <v-col class="flex-sm-grow-1 col-12 col-sm-auto">
                    <v-row>
                        <v-col class="col-12 col-sm-8">
                            <v-card-title class="pa-0">
                                {{brewery.name}}
                            </v-card-title>
                            <p>Adres: {{brewery.address}}</p>
                            <p>E-mail: <a :href="`mailto:${brewery.email}`">{{brewery.email}}</a></p>
                            <p>Telefon: <a :href="`tel:${brewery.phone}`">{{brewery.phone}}</a></p>
                            <p>Zarządza:
                                <router-link :to="`/users/${brewery.user._id}`" v-if="brewery.user">{{brewery.user.username}}</router-link>
                                <span v-else>nienznay</span>
                            </p>

<!--                            <p>Znajdź na mapie: {{brewery.location}}</p>-->
                        </v-col>
                        <v-col class="col-12 col-sm-4">
                            Średnia ocena:
                            <star-rating v-if="brewery.avgRating" :star-size="20" :read-only="true" v-model="brewery.avgRating" :round-start-rating="false" :increment="0.01" :fixed-points="2"/>
                            <p v-else>brak ocen</p>
                            <span >
                                    <v-btn icon color="danger" @click="$emit('deleteBrewery')" v-if="canRemove">
                                        <v-icon>
                                            fas fa-trash
                                        </v-icon>
                                    </v-btn>
                                    <v-btn icon color="info" @click="$emit('editBrewery')" v-if="canEdit">
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
            {{brewery.description}}
        </div>

    </v-card>
</template>

<script>
    import StarRating from 'vue-star-rating';
    import Loader from "../Loader";
    export default {
        name: "BreweryDetails",
        components: {Loader, StarRating},
        props: ['brewery','loading'],
        computed: {
            canEdit(){
                return this.brewery && this.$store.state.isLoggedIn && ( this.brewery.user && this.$store.state.user._id === this.brewery.user._id && this.$store.state.user.userRole==='breweryOwner' || this.$store.state.user.userRole ==='admin' )
            },
            canRemove(){
                return this.brewery && this.$store.state.isLoggedIn && ( this.brewery.user && this.$store.state.user._id === this.brewery.user._id && this.$store.state.user.userRole==='breweryOwner' || this.$store.state.user.userRole ==='admin' )
            }
        }
    }
</script>

<style scoped>
.brewery-image{
    max-height: 300px;
    border: solid 2px green;
    border-radius: 0.5rem;
}
</style>
