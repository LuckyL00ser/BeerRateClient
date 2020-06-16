<template>
    <v-card>
        <loader :loading="loading"/>
        <v-card-title>Zmiana hasła</v-card-title>
        <v-card-text>
            <ValidationObserver v-slot="{ handleSubmit, invalid }" ref="form">
                <v-form @submit.prevent="handleSubmit(setPassword)" :value="!invalid">
                    <ValidationProvider
                            rules="required"
                            name="confirm"
                            v-slot="{ errors, error }"
                            class="flex-grow-1"
                    >
                        <v-text-field
                                v-model="data.oldPassword"
                                type="password"
                                :error="error"
                                :error-messages="errors"
                                label="Obecne hasło"
                        />
                    </ValidationProvider>
                    <ValidationProvider
                            rules="required"
                            name="confirm"
                            v-slot="{ errors, error }"
                            class="flex-grow-1"
                    >
                        <v-text-field
                                v-model="data.password"
                                type="password"
                                :error="error"
                                :error-messages="errors"
                                label="Nowe hasło"
                        />
                    </ValidationProvider>
                    <ValidationProvider
                            rules="required|password:@confirm"
                            v-slot="{ errors, error }"
                            class="flex-grow-1"
                    >
                        <v-text-field
                                v-model="data.passwordRepeat"
                                type="password"
                                :error="error"
                                :error-messages="errors"
                                label="Powtórz nowe hasło"
                        />
                    </ValidationProvider>
                    <v-btn
                            :disabled="invalid"
                            rounded
                            color="primary"
                            class="lighten-5"
                            block
                            type="submit"
                            :loading="loading"
                    >Zmień hasło</v-btn>
                </v-form>
            </ValidationObserver>
        </v-card-text>
    </v-card>
</template>

<script>
    import Loader from "../Loader";
    export default {
        name: "ChangePassword",
        components: {Loader},
        data(){
            return {
                data: {
                    oldPassword: "",
                    password: ""
                },
                loading:false
            }
        },
        methods:{
            async setPassword(){
                this.loading=true;
                try{
                    await this.$http.put(`/api/users/${this.$store.state.user._id}`,this.data)
                    this.$store.toast.success('Ustawiono nowe hasło - obwiązuje od kolejnego logowania',{duration:4000, position: "bottom-right"})
                }
                catch(e){
                    this.$store.toast.error(`Podczas zmiany hasła wystąpił błąd - ${e.response.data.message}`,{duration:4000, position: "bottom-right"})
                }
                this.data.password = "";
                this.data.oldPassword="";
                this.loading=false;
            }
        }
    }
</script>

<style scoped>

</style>
