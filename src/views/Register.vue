<template>
  <v-col cols="12" md="6" class="mx-auto">
    <v-card>
      <v-card-title>Rejestracja</v-card-title>
      <v-card-text>
        <ValidationObserver v-slot="{ handleSubmit, invalid }" ref="form">
          <v-form @submit.prevent="handleSubmit(register)" :value="!invalid">
            <ValidationProvider
              rules="email"
              v-slot="{ errors, error }"
              class="flex-grow-1"
            >
              <v-text-field
                type="email"
                v-model="userData.email"
                :error="error"
                :error-messages="errors"
                label="E-mail"
              />
            </ValidationProvider>
            <ValidationProvider
              rules="required|max:50|min:4"
              v-slot="{ errors, error }"
              class="flex-grow-1"
            >
              <v-text-field
                v-model="userData.username"
                :error="error"
                :error-messages="errors"
                label="Nazwa użytkownika"
              />
            </ValidationProvider>
            <ValidationProvider
                    v-slot="{ errors, error }"
                    class="flex-grow-1 d-flex"
            >

              <AvatarImage class="mr-3" :url="userData.avatarImage?userData.avatarImage:require('@/assets/user.png')" />
              <v-text-field
                      v-model="userData.avatarImage"
                      :error="error"
                      :error-messages="errors"
                      label="Avatar użytkownika (adres URL)"
              />
            </ValidationProvider>
            <ValidationProvider
              rules="required"
              name="confirm"
              v-slot="{ errors, error }"
              class="flex-grow-1"
            >
              <v-text-field
                v-model="userData.password"
                type="password"
                :error="error"
                :error-messages="errors"
                label="Hasło"
              />
            </ValidationProvider>
            <ValidationProvider
              rules="required|password:@confirm"
              v-slot="{ errors, error }"
              class="flex-grow-1"
            >
              <v-text-field
                v-model="userData.passwordRepeat"
                type="password"
                :error="error"
                :error-messages="errors"
                label="Powtórz hasło"
              />
            </ValidationProvider>
            <v-btn
              :disabled="invalid"
              rounded
              color="primary"
              class="lighten-5"
              block
              type="submit"
              :loading="registering"
              >Zarejestruj</v-btn
            >
          </v-form>
        </ValidationObserver>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import AvatarImage from "../components/AvatarImage";
export default {
  name: "Login",
  components: {AvatarImage},
  data() {
    return {
      registering: false,
      userData: {
        email: "",
        username: "",
        password: "",
        passwordRepeat: "",
        avatarImage: "",
      }
    };
  },
  methods: {
    async register() {
      try{
        this.registering = true;
        await this.$store.dispatch("register", this.userData);
        this.registering = false;
        this.$router.push('/login')
      }
      catch(e){
        console.log(e)
      }
    }
  }
};
</script>
