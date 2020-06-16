<template>
    <v-card>
        <loader :loading="loading"/>
        <v-card-text class="d-flex flex-md-row flex-column" >
            <AvatarImage class="mx-auto" :url="user.avatarImage?user.avatarImage:require('@/assets/user.png')" />
            <div class="px-3 flex-grow-1 mt-2">
                <v-card-title class="pa-0 d-flex w-100">
                    {{user.username}}
                    <UserModal :hidden="true" ref="userModal" @updated="$emit('updated')"/>
                </v-card-title>
                <p>E-mail: <a :href="`mailto:${user.email}`">{{user.email}}</a></p>
                <p>Data rejestracji: {{(new Date(user.createdDate)).toLocaleString()}}</p>
                <p>Rola: {{role}}</p>

                <v-btn rounded color="info" v-if="$store.state.isLoggedIn && $store.state.user._id ==user._id" @click="editUser">
                    Edytuj profil
                </v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    import UserModal from "./UserModal";
    import Loader from "../Loader";
    import AvatarImage from "../AvatarImage";
    export default {
        name: "UserDetails",
        components: {AvatarImage, Loader, UserModal},
        props: ['user','loading'],
        methods:{
            editUser(){
                this.$refs.userModal.open(this.user);
            },
        },
    computed:{
        role(){
            if(this.user.userRole==='consumer')
                return 'Zwykły użytkownik'
            if(this.user.userRole==='breweryOwner')
                return 'Właściciel browaru'
            if(this.user.userRole==='admin')
                return 'Administrator'
            return '';
        }
    },
    }
</script>

<style scoped>

</style>
