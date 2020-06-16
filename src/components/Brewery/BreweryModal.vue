<template>
  <v-dialog v-model="dialog" max-width="600" @click:outside="close">
    <template v-slot:activator="{ on }">
      <v-btn color="secondary" rounded v-on="on" v-if="!hidden">
        Dodaj browar
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Browar dodawanie/edycja
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
              rules="required|min:4|max:100"
              v-slot="{ errors, error }"
              class="flex-grow-1"
            >
              <v-text-field
                v-model="model.name"
                :error="error"
                :error-messages="errors"
                label="Nazwa browaru"
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
                  <AvatarImage
                    :url="
                      model.image
                        ? model.image
                        : require('@/assets/brewery.jpg')
                    "
                  />
                </template>
              </v-text-field>
            </ValidationProvider>
            <ValidationProvider
              rules="required|max:150"
              v-slot="{ errors, error }"
              class="flex-grow-1"
            >
              <v-text-field
                v-model="model.address"
                :error="error"
                :error-messages="errors"
                label="Adres"
              />
            </ValidationProvider>
 <!--           <ValidationProvider v-slot="{ errors, error }" class="flex-grow-1">
              <v-text-field
                v-model="model.location.coordinates"
                :error="error"
                :error-messages="errors"
                label="Współrzędne geolokalizacyjne"
              />
            </ValidationProvider>-->
            <ValidationProvider
              rules="email|max:128"
              v-slot="{ errors, error }"
              class="flex-grow-1"
            >
              <v-text-field
                v-model="model.email"
                :error="error"
                :error-messages="errors"
                label="Adres e-mail"
              />
            </ValidationProvider>
            <ValidationProvider
              rules="numeric|max:15"
              v-slot="{ errors, error }"
              class="flex-grow-1"
            >
              <v-text-field
                v-model="model.phone"
                :error="error"
                :error-messages="errors"
                label="Telefon"
              />
            </ValidationProvider>
            <ValidationProvider
              rules="required|max:512"
              v-slot="{ errors, error }"
              class="flex-grow-1"
            >
              <v-textarea
                v-model="model.description"
                rows="2"
                :error="error"
                :error-messages="errors"
                label="Opis browar"
              />
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
import AvatarImage from "../AvatarImage";
export default {
  name: "BreweryModal",
  components: {AvatarImage},
  props:['hidden'],
  data() {
    return {
      template: {
        name: "",
        location: {
          type:"Point",
          coordinates:[20,30],
        },
        email: null,
        phone: null,
        description: "",
        image: null,
        address: null,
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
      this.$emit('breweriesListEdited');
      this.close();
    },
    updateValue() {
      this.$emit("input", this.model);
    },
    async create() {
      try {
        await this.$http.post("api/breweries", this.model);
        this.$store.toast.success('Pomyślnie dodano nowy browar',{duration:4000, position: "bottom-right"})
      } catch (error) {
        this.$store.toast.error(`Podczas dodawania browaru wystąpił błąd - ${error.response.data.message}`,{duration:4000, position: "bottom-right"})
      }
    },
    async update() {
      try {
        await  this.$http.put(`/api/breweries/${this.model._id}`, this.model);
        //  const response = await updateDrink(data._id,data);
        //this.$store.dispatch('getMachine',this.getMachine._id);
        this.$store.toast.info(`Pomyślnie zapisano zmiany`,{duration:4000, position: "bottom-right"})
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
    open(brewery){
      if (!brewery) {
        this.edit=false;
        Object.assign(this.model, this.template);
      } else {
        this.edit=true;
        Object.assign(this.model, brewery);
      }
      this.dialog=true;
    }
  }
};
</script>

<style scoped></style>
