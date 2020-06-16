<template>
    <v-card class="flex-grow-1">

        <ValidationObserver v-slot="{ handleSubmit, invalid }" ref="form" >
        <v-card-title class="d-flex pb-0">
            <div>
                <router-link :to="`/users/${opinion.user._id}`" v-if="opinion && opinion.user" class="d-flex">
                    <AvatarImage small="true" rounded="true" class="mr-3" :url="opinion.user.avatarImage?opinion.user.avatarImage:require('@/assets/user.png')" />
                </router-link>
            </div>
            <div>
                <router-link :to="`/users/${opinion.user._id}`" v-if="opinion">
                        {{opinion.user.username}}
                </router-link>
                <p class="my-0 py-0" v-else>Twoja opinia</p>
                <ValidationProvider rules="required" v-slot="{ errors }">
                    <star-rating
                            v-model="opinion.rating"
                            :increment="0.5"
                            :star-size="20"
                            :show-rating="false"
                            :read-only="true"
                            v-if="opinion&&!editMode"/>
                    <star-rating
                            v-model="emptyOpinion.rating"
                            :increment="0.5"
                            :star-size="20"
                            :show-rating="false"
                            :read-only="!editMode"
                            v-else/>
                    <p v-for="err in errors" :key="err">err</p>
                </ValidationProvider>
            </div>

        </v-card-title>
        <v-card-text>
                <v-form @submit.prevent="handleSubmit(submit)" :value="!invalid" v-if="editMode">

                <ValidationProvider rules="required|max:256"
                                    v-slot="{ errors, error }"
                                    class="flex-grow-1 " >
                    <v-textarea rows="3"
                                v-model="emptyOpinion.description"
                                :error="error"
                                :error-messages="errors"
                                class="mt-0"
                                label="Co o tym sądzisz?">
                    </v-textarea>
                </ValidationProvider>
                    <v-btn       :disabled="invalid"
                                 rounded
                                 color="info"
                                 block
                                 type="submit"
                                 :loading="submitting">
                        {{submitButton}}
                    </v-btn>
                </v-form>
            <div v-else-if="opinion">
                {{opinion.description}}
                <div class="mt-2">
                    <small>{{(new Date(opinion.createdDate).toLocaleString())}}</small>
                    <p class="float-right" v-if="!editMode">
                        <v-btn rounded color="info" @click="edit" v-if="editable">Edytuj</v-btn>
                        <v-btn rounded color="error" @click="remove" v-if="removable">Usuń</v-btn>
                    </p>
                </div>
            </div>
        </v-card-text>

        </ValidationObserver>
    </v-card>
</template>

<script>
    import StarRating from 'vue-star-rating'
    import AvatarImage from "../AvatarImage";
    export default {
        name: "Opinion",
        components: {AvatarImage, StarRating},
        props: ['opinion','editable','removable','targetObjectId'],
        data(){
            return {
                editMode: false,
                emptyOpinion:{
                    object: "",
                    description: "",
                    rating: null,
                },
                submitting: false,
            }
        },
        computed:{
            submitButton(){
                return "Dodaj"
            }
        },
        mounted() {
            if(!this.opinion)
                this.editMode=true;
        },
        methods: {
            edit(){
                this.editMode=true;
                Object.assign(this.emptyOpinion,this.opinion);
            },
            async remove(){
              try{
                  this.submitting=true;
                  await this.$http.delete(`/api/opinions/${this.opinion._id}`)
                  this.$store.toast.success('Usunięto opinię',{duration:4000, position: "bottom-right"})
                  this.$emit('opinionRemoved')

              }  catch(e){
                  this.$store.toast.error(`Podczas usuwania opinii wystąpił błąd - ${e.response.data.message}`,{duration:4000, position: "bottom-right"})
              }
              this.submitting=false;
            },
            async submit(){
                this.submitting=true;
                if(this.opinion){
                    try{
                        await this.$http.put(`/api/opinions/${this.opinion._id}`,this.emptyOpinion)
                        this.$store.toast.success('Zapisano zmianny',{duration:4000, position: "bottom-right"})
                        this.$emit('opinionModified')
                    }
                    catch(e){
                        this.$store.toast.error(`Podczas edycji opinii wystąpił błąd - ${e.response.data.message}`,{duration:4000, position: "bottom-right"})
                    }
                    this.editMode=false;
                }else{
                    try{
                        this.emptyOpinion.object = this.targetObjectId;
                        await this.$http.post('/api/opinions',this.emptyOpinion)
                        this.$store.toast.success('Dodano nową opinię',{duration:4000, position: "bottom-right"})
                        this.$emit('opinionPosted')

                        this.emptyOpinion.description = "" ;
                        this.emptyOpinion.rating = null;
                        this.$nextTick(()=>this.$refs.form.reset());
                    }
                    catch(e){
                        this.$store.toast.error(`Podczas dodawania opinii wystąpił błąd - ${e.response.data.message}`,{duration:4000, position: "bottom-right"})
                    }
                }
                this.submitting=false;
            }
        }
    }
</script>

<style scoped>

</style>
