<template>
  <div class="position-relative">
    <loader :loading="loading"/>
    <v-list v-if="beers.length">
      <v-list-item-group v-model="item">
      <v-list-item two-line v-for="beer in beers" :key="beer._id" :to="`/beers/${beer._id}`" class="px-0 px-md-2">

          <AvatarImage small="true" class="mr-3" :url="(beer.image==null)?require('@/assets/beer.jpg'):beer.image" alt />
        <v-list-item-content>
          <v-list-item-title class="d-flex justify-space-between">{{ beer.name }}
            <star-rating read-only :increment="0.01" v-model="beer.avgRating" :star-size="15"  :show-rating="false"/>
          </v-list-item-title>
          <v-list-item-subtitle>Browar:
            <router-link v-if="beer.brewery" :to="`/breweries/${beer.brewery._id}`">
            {{beer.brewery.name}}</router-link>
            <span v-else>nieznany</span>
          </v-list-item-subtitle>
          <v-list-item-subtitle>Gatunek:
            <v-chip small v-for="beerType in beer.beerType" :key="beerType._id">
              {{beerType.name}}
            </v-chip></v-list-item-subtitle>
        </v-list-item-content>


      </v-list-item>
      </v-list-item-group>
    </v-list>
    <h2 class="py-4 text-center" v-else>Brak piw</h2>
  </div>
</template>

<script>
import Loader from "../Loader";
import StarRating from 'vue-star-rating'
import AvatarImage from "../AvatarImage";
export default {
  name: "BeerList",
  components: {AvatarImage, Loader,StarRating},
  props: ["beers","loading"],
  data(){
    return {
      item: null
    }
  }
};
</script>

<style scoped></style>
