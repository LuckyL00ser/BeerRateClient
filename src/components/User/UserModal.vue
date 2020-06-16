<template>
    <v-dialog v-model="dialog" max-width="600" @click:outside="close">
        <template v-slot:activator="{ on }" v-if="!hidden">
            <v-btn color="secondary" rounded v-on="on">
               Edytuj profil
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                Edytuj profil
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
                                rules="email"
                                v-slot="{ errors, error }"
                                class="flex-grow-1"
                        >
                            <v-text-field
                                    type="email"
                                    v-model="model.email"
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
                                    v-model="model.username"
                                    :error="error"
                                    :error-messages="errors"
                                    label="Nazwa użytkownika"
                            />
                        </ValidationProvider>
                        <ValidationProvider
                                v-slot="{ errors, error }"
                                class="flex-grow-1 d-flex"
                        >

                            <img class="avatar-image-small mr-3" :src="model.avatarImage?model.avatarImage:require('@/assets/user.png')" />
                            <v-text-field
                                    v-model="model.avatarImage"
                                    :error="error"
                                    :error-messages="errors"
                                    label="Avatar użytkownika (adres URL)"
                            />
                        </ValidationProvider>
                        <v-btn
                                type="submit"
                                rounded
                                :disabled="invalid"
                                :loading="loading"
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
    export default {
        name: "UserModal",
        props:['hidden'],
        data() {
            return {
                template: {
                    username: "",
                    avatarImage: "",
                    email: ""
                },
                model: {},
                dialog: false,
                edit:false,
                loading: false,
            };
        },
        created() {
            Object.assign(this.model,this.template);
        },
        methods: {
            async submit() {
                await this.update()
                this.$emit('updated');
                this.close();
            },
            async update() {
                this.loading=true;
                try {
                    const response = await this.$http.put(`/api/users/${this.model._id}`, this.model);
                    await this.$store.commit('setUserData',response.data)
                    //  const response = await updateDrink(data._id,data);
                    //this.$store.dispatch('getMachine',this.getMachine._id);
                    this.$store.toast.info('Zapisano zmiany',{duration:4000, position: "bottom-right"})

                } catch (error) {
                    this.$store.toast.error(`Podczas edycji profilu - ${error.response.data.message}`,{duration:4000, position: "bottom-right"})
                }
                this.loading=false;
            },
            close() {
                Object.assign(this.model,this.template);
               // this.$nextTick(() => this.$refs.form.reset());

                this.dialog = false;
                this.edit=false;
            },
            open(userToEdit){
                Object.assign(this.model, userToEdit);
                this.dialog=true;
            }
        }
    };
</script>
