<template>
    <v-container>

        <h1>Profil użytkownika:</h1>
        <p v-if="$store.state.isLoggedIn && $route.params.userID == $store.state.user._id">To twój profil - możesz go edytować</p>
        <v-row>
            <v-col>
                <UserDetails :user="user" :loading="loading" @updated="getUser"/>

                <template v-if="$store.state.isLoggedIn && $store.state.user.userRole=='admin' && $store.state.user._id != this.$route.params.userID">
                    <v-btn rounded color="info"  @click="makeConsumer">
                        Uczyń zwykłym użytkownikiem
                    </v-btn>
                    <v-btn rounded color="info"  @click="makeOwner">
                        Uczyń właścicielem browaru
                    </v-btn>
                    <v-btn rounded color="info"  @click="makeAdmin">
                        Uczyń administratorem
                    </v-btn>
                </template>
            </v-col>
            <v-col class="col-12 col-md-6 col-lg-3" v-if="this.$store.state.isLoggedIn && this.$store.state.user._id==this.$route.params.userID">
                <ChangePassword />
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    import UserDetails from "../components/User/UserDetails";
    import ChangePassword from "../components/User/ChangePassword";
    export default {
        name: "UserView",
        components: {ChangePassword, UserDetails},
        data() {
            return {
                user: {
                    username: "",
                    email: "",
                    createdDate: "",
                    userRole: "",
                },
                loading: false,
            }
        },
        watch:{
          '$route.params.userID': function(){
              this.getUser();
          }
        },
        mounted() {
            this.getUser();
        },
        methods: {
            async getUser() {
                if (this.$store.state.isLoggedIn && this.$route.params.userID === this.$store.state.user._id)
                    Object.assign(this.user, this.$store.state.user)
                else {
                    this.loading = true;
                    try {
                        const response = await this.$http.get(`/api/users/${this.$route.params.userID}`);
                        this.user = response.data;
                    } catch (e) {

                        this.$store.toast.error(`Podczas ładowania danych użytkownika wystąpił błąd - ${e.response.data.message}`, {
                            duration: 4000,
                            position: "bottom-right"
                        })
                    }
                    this.loading = false;
                }
            },
            async setUser(user){
                this.loading=true;
                try {
                    await this.$http.put(`/api/users/${this.$route.params.userID}`, user);
                    await this.getUser();
                    this.$store.toast.info('Zapisano zmiany',{duration:4000, position: "bottom-right"})

                } catch (error) {
                    this.$store.toast.error(`Błąd podczas edycji profilu - ${error.response.data.message}`,{duration:4000, position: "bottom-right"})
                }
                this.loading=false;
            },
            makeConsumer(){
                let tmp = {};
                Object.assign(tmp,this.user);
                tmp.userRole = 'consumer';
                this.setUser(tmp)
            },
            makeOwner(){
                let tmp = {};
                Object.assign(tmp,this.user);
                tmp.userRole = 'breweryOwner';
                this.setUser(tmp)
            },
            makeAdmin(){
                let tmp = {};
                Object.assign(tmp,this.user);
                tmp.userRole = 'admin';
                this.setUser(tmp)
            }
        }
    }
</script>

<style scoped>

</style>
