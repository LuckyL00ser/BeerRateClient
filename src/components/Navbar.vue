<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        class="d-inline-block d-lg-none"
        @click="drawer = true"
      />
      <v-spacer class="d-inline-block d-lg-none" />
      <router-link tag="h1" to="/">Oceń Piwo</router-link>
      <v-spacer></v-spacer>
      <v-navigation-drawer v-model="drawer" app absolute>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Oceń Piwo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense>
         <v-list-item-group>
           <v-list-item v-for="item in routes" :key="item.path" link :to="item.path">
             <v-list-item-avatar>
               <v-icon>
                 {{item.icon}}
               </v-icon>
             </v-list-item-avatar>
             <v-list-item-content>
               <v-list-item-title>{{ item.name }}</v-list-item-title>
             </v-list-item-content>
           </v-list-item>
         </v-list-item-group>
          <v-list-item-group v-if="!$store.state.isLoggedIn">
            <v-list-item  to="/login">
              <v-list-item-avatar>
                <v-icon>
                  fas fa-sign-in-alt
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-title>
                Logowanie
              </v-list-item-title>
            </v-list-item>
            <v-list-item to="/register">
              <v-list-item-avatar>
                <v-icon>
                  fas fa-user-circle
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-title >
                Rejestracja
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
          <v-list-item-group v-else>
            <v-list-item :to="`/users/${$store.state.user._id}`">
              <v-list-item-avatar>
                <v-icon>
                  fas fa-user
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-title>Profil użytkownika</v-list-item-title>
            </v-list-item>

            <v-list-item @click="logout">
              <v-list-item-avatar>
                <v-icon>
                  fas fa-sign-out-alt
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-title>Wyloguj</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <div class="d-lg-inline-block d-none">
        <v-btn
          v-for="item in routes"
          :to="item.path"
          :key="item.path"
          text
          class="mr-2 "
          >
          <v-icon class="mr-2">
            {{item.icon}}
          </v-icon>
          {{ item.name }}</v-btn
        >
        <template v-if="!$store.state.isLoggedIn">
          <v-btn
                  text
                  class="mr-2 "
                  to="/register"
          >rejestracja</v-btn>
          <v-btn
                  text
                  class="mr-2 "
                  to="/login"
          >logowanie</v-btn>
        </template>
        <template v-else>
          <v-btn rounded @click="logout">
            <v-icon>
              fas fa-sign-out-alt
            </v-icon>
            Wyloguj
          </v-btn>
          <v-btn rounded :to="`/users/${$store.state.user._id}`"  class="ml-2 pr-0" color="secondary">
            Mój profil
            <AvatarImage  small="true" :url="$store.state.user.avatarImage?$store.state.user.avatarImage:require('@/assets/user.png')" />
          </v-btn>
        </template>

      </div>
    </v-app-bar>
  </div>
</template>

<script>
import AvatarImage from "./AvatarImage";
export default {
  name: "Navbar",
  components: {AvatarImage},
  data() {
    return {
      drawer: false,
      routes: [
        { icon: 'fas fa-beer', name: "Wyszukiwarka", path: "/search-beer" },
        {
          icon: 'fas fa-industry',
          name: "Browary",
          path: "/breweries"
        },
        {
          icon: 'fas fa-list',
          name: "Gatunki piw",
          path: "/beer-types"
        },
      ],
    };
  },
  methods: {
    logout(){
      this.$store.dispatch('logout');
      this.$router.push('/')
    }
  }
};
</script>

<style scoped>
  .avatar-image-small{
    height: 36px;
    width: 36px;
  }
</style>
