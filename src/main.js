import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import ToastedPlugin from "vue-toasted";
import "./helpers/validationRules";
// eslint-disable-next-line no-unused-vars
import {axios} from './helpers/axiosConfig';
import {initializationUserAuthentication} from "./helpers/auth";


Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.use(ToastedPlugin);

axios.interceptors.response.use(
    response => response,
    async error => {
      const { status } = error.response;
      if (status === 401 && !error.response.config.url.endsWith("/login")) {
        await store.dispatch("logout");
      }return Promise.reject(error);
    }
);
const init = async ()=>{
  await initializationUserAuthentication(store)
  const instance = new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount("#app");
  store.toast = instance.$toasted;
}
init();




router.beforeEach((to,from,next)=>{
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const loggedIn = store.state.isLoggedIn;

  if(requiresAuth && !loggedIn){
    next('/login')
  }
  else if((to.path =='/login' || to.path=='/register') && loggedIn){
    next('/')
  }else{
    next()
  }

});




