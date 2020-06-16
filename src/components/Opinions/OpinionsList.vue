<template>
    <v-card class="px-0">
        <v-card-title>Opinie</v-card-title>
        <v-card-text class="px-0">
            <v-list-item v-if="$store.state.isLoggedIn"  style="z-index: 2">
                <Opinion :target-object-id="targetObjectId" @opinionPosted="getOpinions"/>
            </v-list-item>
            <v-list class="position-relative">

                <loader :loading="loading" />

                <transition-group name="list" v-if="opinions.length">

                    <v-list-item class="my-3 list-item" v-for="opinion in opinions" :key="opinion._id">
                        <Opinion
                                @opinionModified="getOpinions"
                                @opinionRemoved="getOpinions"
                                :opinion="opinion"
                                :target-object-id="targetObjectId"
                                :editable="canEdit(opinion)"
                                :removable="canRemove(opinion)"/>
                    </v-list-item>
                </transition-group>
                <div class="px-4" v-else>
                    <p>Brak opinii</p>
                </div>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
    import Loader from "../Loader";
    import Opinion from "./Opinion";
    export default {
        name: "OpinionsList",
        components: {Opinion, Loader},
        props: ['targetObjectId'],
        data(){
            return{
                loading:false,
                opinions:[],
            }
        },
        methods:{
         async getOpinions(){
                try{
                    this.loading=true;
                    const response = await this.$http.get(`/api/opinions/?object=${this.targetObjectId}`);
                    this.opinions = response.data;
                }
                catch(e){
                    this.$store.toast.error(`Podczas ładowania opinii wystąpił błąd - ${e.response.data.message}`,{duration:4000, position: "bottom-right"})
                }
                this.loading=false;
            },
            canEdit(opinion){
                return this.$store.state.isLoggedIn && this.$store.state.user._id === opinion.user._id
            },
            canRemove(opinion){
                return this.$store.state.isLoggedIn && (this.$store.state.user._id === opinion.user._id || this.$store.state.user.userRole=='admin')
            }
        },
        created() {
            this.getOpinions()
        }
    }
</script>

<style scoped>

    .list-item {
        transition: all 1s;
    }
    .list-enter, .list-leave-to  {
        opacity: 0;
        transform: translateY(30px);
    }
    .list-leave-active{
        position: absolute;
    }
</style>
