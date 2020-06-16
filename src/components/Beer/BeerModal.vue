<template>
  <v-dialog v-model="dialog" max-width="600" @click:outside="close">
    <template v-slot:activator="{ on }" v-if="!hidden">
      <v-btn color="secondary" rounded v-on="on">
        Dodaj piwo
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Piwo dodawanie/edycja
        <v-spacer />
        <v-btn icon @click="close">
          <v-icon>
            fas fa-times
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <ValidationObserver v-slot="{ handleSubmit, invalid }" ref="form">
          <v-form @submit.prevent="handleSubmit(submit)" :value="!invalid">
            <ValidationProvider
              rules="required|min:4|max:50"
              v-slot="{ errors, error }"
              class="flex-grow-1"
            >
              <v-text-field
                v-model="model.name"
                :error="error"
                :error-messages="errors"
                label="Nazwa piwa"
              />
            </ValidationProvider>
            <ValidationProvider
                    rules="max:256"
                    v-slot="{ errors, error }"
                    class="flex-grow-1"
            >
              <v-text-field
                      v-model="model.image"
                      :error="error"
                      :error-messages="errors"
                      label="Adres obrazka"
              >
                <template v-slot:append-outer>

                  <AvatarImage :url="model.image?model.image:require('@/assets/beer.jpg')" />
                </template>
              </v-text-field>
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{errors,error}" class="flex-grow-1">
              <BeerTypeSelector v-model="model.beerType" :invalid="error" :errors="errors" label="Gatunek piwa" />
            </ValidationProvider>
            <ValidationProvider rules="" v-slot="{errors,error}" class="flex-grow-1">
              <BrewerySelector v-model="model.brewery" :invalid="error" :errors="errors" label="Browar" />
            </ValidationProvider>
              <ValidationProvider rules="required|max:512" v-slot="{errors,error}" class="flex-grow-1">
                  <v-textarea v-model="model.description" rows="2" :error="error" :error-messages="errors" label="Opis produktu" />
              </ValidationProvider>
            <ValidationProvider
              rules="required|max_value:100|min_value:0"
              v-slot="{ errors, error }"
              class="flex-grow-1"
            >
              <v-slider
                v-model="model.alcoholPercentage"
                max="100"
                min="0"
                :error="error"
                :error-messages="errors"
                label="Zawartość alkoholu %"
              >
                <template v-slot:append>
                  <v-text-field
                          v-model="model.alcoholPercentage"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                  ></v-text-field>
                  %
                </template>
              </v-slider>
            </ValidationProvider>
            <ValidationProvider
                    rules="required|max_value:160|min_value:1"
                    v-slot="{ errors, error }"
                    class="flex-grow-1"
            >
              <v-slider
                      v-model="model.IBU"
                      max="160"
                      min="1"
                      :error="error"
                      :error-messages="errors"
                      label="Goryczka (IBU):"
              >
                <template v-slot:append>
                  <v-text-field
                          v-model="model.IBU"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                  />
                </template>
              </v-slider>
            </ValidationProvider>
            <v-btn
              type="submit"
              rounded
              :disabled="invalid"
              block
              :color="edit ? 'info' : 'success'"
              >Zapisz zmiany</v-btn
            >
          </v-form>
        </ValidationObserver>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import BrewerySelector from "../Brewery/BrewerySelector";
import BeerTypeSelector from "./BeerTypeSelector";
  import AvatarImage from "../AvatarImage";
export default {
  name: "BeerModal",
  components: {AvatarImage, BrewerySelector,BeerTypeSelector},
  props:['hidden'],
  data() {
    return {
      template: {
        name: "",
        beerType: [],
        brewery: null,
        description: "",
        user: {},
        IBU: null,
        alcoholPercentage: null,
        image: null
      },
      model: {},
      dialog: false,
      edit:false,
    };
  },
  created() {
    Object.assign(this.model,this.template);
  },
  methods: {
    async submit() {
      if (this.edit)
        await this.update();
      else await this.create();
      this.$emit('beerListEdited');
      this.close();
    },
    async create() {
      try {
        await this.$http.post("api/beers", this.model);
        this.$store.toast.success(`Dodano nowe piwo`,{duration:4000, position: "bottom-right"})
      } catch (error) {
        this.$store.toast.error(`Podczas dodawania piwa wystąpił błąd - ${error.response.data.message}`,{duration:4000, position: "bottom-right"})
      }
    },
    async update() {
      try {
        await this.$http.put(`/api/beers/${this.model._id}`, this.model);
        //  const response = await updateDrink(data._id,data);
        //this.$store.dispatch('getMachine',this.getMachine._id);

        this.$store.toast.info(`Zapisano zmiany`,{duration:4000, position: "bottom-right"})
      } catch (error) {
        this.$store.toast.error(`Podczas dodawania zmian wystąpił błąd - ${error.response.data.message}`,{duration:4000, position: "bottom-right"})
      }
    },
    close() {
      this.dialog = false;
      this.edit=false;
      Object.assign(this.model,this.template);
      this.$nextTick(() => this.$refs.form.reset());
    },
   open(beerToEdit){
     if (!beerToEdit) {
       this.edit=false;
       Object.assign(this.model, this.template);
     } else {
       this.edit=true;
       Object.assign(this.model, beerToEdit);
     }
     this.dialog=true;
   }
  }
};
</script>

<style scoped></style>
