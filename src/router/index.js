import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login";
import Register from "../views/Register";
import Search from "../views/Search";
import Breweries from "../views/Breweries";
import ProductView from "../views/ProductView";
import UserView from "../views/UserView";
import BreweryView from "../views/BreweryView";
import BeerTypeView from "../views/BeerTypeView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/search-beer",
    name: "Beer",
    component: Search
  },
  {
    path: "/breweries",
    name: "Breweries",
    component: Breweries
  },
  {
    path: "/beers/:id",
    name: "ProductView",
    component: ProductView
  },
  {
    path: "/users/:userID",
    name: "UserView",
    component: UserView
  },
  {
    path: "/beer-types",
    name: "BeerTypes",
    component: BeerTypeView
  },
  {
    path: "/breweries/:id",
    name: "BreweryView",
    component: BreweryView
  },
  {
    path:'*',
    component: Home
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
