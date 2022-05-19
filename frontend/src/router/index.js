// IMPORT(S)
import Vue from "vue"; // Importation de "Vue"
import VueRouter from "vue-router"; // Importation de "Vue Router"
import SignUpView from "../views/SignUpView.vue"; // Importation de la View "SignUpView"
import LoginView from "../views/LoginView.vue"; // Importation de la View "LoginView"
import ProfileView from "../views/ProfileView.vue"; // Importation de la View "ProfileView"
import HomePageView from "../views/HomePageView"; // Importation de la View "HomePageView"

// Connexion de "VueRouter" à "Vue"
Vue.use(VueRouter);

// Configuration des différentes routes
const routes = [
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/homepage",
    name: "homepage",
    component: HomePageView,
  },
];

// Instantiation d'une instance de "VueRouter"
const router = new VueRouter({
  mode: "history",
  routes,
});

// EXPORT(S)
export default router; // Exportation du router
