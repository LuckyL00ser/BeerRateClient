<template>
  <v-col cols="12" md="6" class="mx-auto">
    <v-card>
      <v-card-title>Logowanie</v-card-title>
      <v-card-text>
        <ValidationObserver v-slot="{ handleSubmit, invalid }" ref="form">
          <v-form @submit.prevent="handleSubmit(login)" :value="!invalid">
            <ValidationProvider
              rules="email"
              v-slot="{ errors, error }"
              class="flex-grow-1"
            >
              <v-text-field
                type="email"
                v-model="loginData.email"
                :error="error"
                :error-messages="errors"
                label="E-mail"
              />
            </ValidationProvider>
            <ValidationProvider
              rules="required"
              v-slot="{ errors, error }"
              class="flex-grow-1"
            >
              <v-text-field
                v-model="loginData.password"
                type="password"
                :error="error"
                :error-messages="errors"
                label="Hasło"
              />
            </ValidationProvider>
            <v-btn
              :disabled="invalid"
              rounded
              color="primary"
              class="lighten-5"
              block
              type="submit"
              :loading="loggingIn"
              >Zaloguj</v-btn
            >
          </v-form>
        </ValidationObserver>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loggingIn: false,
      loginData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      try{
        this.loggingIn = true;
        await this.$store.dispatch("login", this.loginData);
        this.$router.push('/')
        this.$store.toast.success(`Zalogowano`,{duration:4000, position: "bottom-right"})
      }
      catch(e){
        console.log(e)
      }
      this.loggingIn = false;
    }
  }
};
</script>

<style scoped></style>
