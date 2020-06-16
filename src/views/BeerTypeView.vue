<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        Dostępne rodzaje piw:
                    </v-card-title>
                    <v-card-text>
                        <ValidationObserver v-slot="{ handleSubmit, invalid }" ref="form" v-if="$store.state.isLoggedIn">
                            <v-form @submit.prevent="handleSubmit(addBeerType)" :value="!invalid">
                                <ValidationProvider
                                        rules="required|max:50"
                                        v-slot="{ errors, error }"
                                        class="flex-grow-1"
                                >
                                    <v-text-field
                                            v-model="newName"
                                            :error="error"
                                            :error-messages="errors"
                                            label="Dodaj nowy gatunek"
                                    />
                                </ValidationProvider>
                                <v-btn rounded color="primary" type="submit">
                                    Dodaj
                                </v-btn>
                            </v-form>
                        </ValidationObserver>

                        <loader :loading="loading"/>
                        <v-list dense v-if="beerTypes.length" v-model="item">
                            <v-list-item v-for="type in beerTypes" :key="type._id" @click="$router.push({path:'/search-beer',query:{beer_type:JSON.stringify(type)}})">{{type.name}}</v-list-item>
                        </v-list>
                        <p v-else>Brak - dodaj coś</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Loader from "../components/Loader";
    export default {
        name: "BeerTypeView",
        components: {Loader},
        data(){
            return  {
                beerTypes: [],
                loading:false,
                newName: '',
                item:null
            }
        },
        mounted() {
            this.getBeerTypes();
        },
        methods:{
          async getBeerTypes(){
              this.loading=true;
              try{
                    const response = await this.$http.get('api/beer-types');
                    this.beerTypes = response.data;
              }
              catch(e){
                  this.$store.toast.error('Błąd podczas pobiernia listy rodzajów piwa');
              }
              this.loading=false;
          } ,
          async addBeerType(){
              this.loading=true;
              try{
                   await this.$http.post('api/beer-types',{name:this.newName});
                  await this.getBeerTypes();
                  this.$store.toast.success('Dodano nowy rodzaj piwa');
              }
              catch(e){
                  this.$store.toast.error('Błąd podczas dodawania');
              }
              this.newName = "";
              this.$nextTick(()=>this.$refs.form.reset())
              this.loading=false;
            }
        }
    }
</script>

<style scoped>

</style>
