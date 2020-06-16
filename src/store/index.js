import Vue from "vue";
import Vuex from "vuex";
import {setAuthorizationToken} from '../helpers/axiosConfig'
import * as auth from "../helpers/auth";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: null,
    auth:{
      accessToken:null,
      refreshToken:null,
    },
    tokenTimeoutId:null,
    user: null
  },
  mutations: {
    login(state, payload) {
      state.isLoggedIn = true;
      state.auth.accessToken = payload.accessToken;
      state.auth.refreshToken = payload.refreshToken;
      state.user=payload.user;
    },
    setUserData(state,payload){
      state.user=payload.user;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.auth.accessToken = null;
      state.auth.refreshToken = null;
      state.user=null;
     // auth.logout();
    },
    setTimeoutTokenId(state,id){
      state.tokenTimeoutId = id;
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    }
  },
  actions: {
    async login({  dispatch }, credentials) {
      try {
        const response = await auth.login(credentials);
        dispatch('authorize',response.data);
      } catch (error) {

        this.toast.error(`Błąd logowania ${error.response.data.message}`,{duration:4000, position: "bottom-right"})
        throw Error(error)
      }
    },
    async authorize({commit,dispatch}, data){
      if(auth.validateTokenExpirationTime(data.accessToken)){
        commit('login',data);
        auth.setLocalStorageTokens(data);
        auth.setLocalStorageUser(data.user);
        setAuthorizationToken(data.accessToken);
        dispatch('refreshToken');
      }
    },
    async refreshToken({ commit, dispatch, state }) {
      //await dispatch("clearTimeoutToken");
      if(state.tokenTimeoutId){
        clearTimeout(state.tokenTimeoutId);
        commit('setTimeoutTokenId',null);
      }

      const renewalTimeBuffer = 2000;
      const timeDiff = auth.tokenExpiration(state.auth.accessToken) - new Date();
      let timeoutCount = renewalTimeBuffer < timeDiff ? timeDiff - renewalTimeBuffer : timeDiff;
      if (timeoutCount) {
        const renewalTimeout = setTimeout(() => {
          dispatch("getNewRefreshToken");
        }, timeoutCount);
        commit('setTimeoutTokenId', renewalTimeout);
      } else {
        await dispatch("getNewRefreshToken");
      }
    },
    async getNewRefreshToken({ dispatch, state }) {
        try{
          const response = await auth.refresh(state.auth.refreshToken);
          dispatch('authorize',response.data);
        } catch (error) {
          this.toast.error(`Błąd odnawiania tokenu ${error.response.data.message}`,{duration:4000, position: "bottom-right"})
        }
    },
    logout({ commit,state }) {
      if(state.tokenTimeoutId){
        clearTimeout(state.tokenTimeoutId);
        commit('setTimeoutTokenId',null);
      }
      commit("logout");
      auth.removeTokens();
      setAuthorizationToken(null);
      this.toast.success(`Wylogowano`,{duration:4000, position: "bottom-right"})
    },
    // eslint-disable-next-line no-unused-vars
    async register( { commit },userData) {
      try {
        await auth.register(userData);
        this.toast.success(`Zarejestrowano nowego użytkownika - teraz mozesz się zalogować`,{duration:4000, position: "bottom-right"})
      } catch (error) {
        this.toast.error(`Błąd rejestracji ${error.response.data.message}`,{duration:4000, position: "bottom-right"})
      }
    },
  },
  modules: {}
});
