// IMPORT(S)
import Vue from "vue"; // Importation de "Vue"
import VueRouter from "vue-router"; // Importation de "Vue Router"
import LoginView from "../views/LoginView.vue"; // Importation de la View "LoginView"
import ProfileView from "../views/ProfileView.vue"; // Importation de la View "ProfileView"
import HomePageView from "../views/HomePageView.vue"; // Importation de la View "HomePageView"

// Connexion de "VueRouter" à "Vue"
Vue.use(VueRouter);

// Configuration des différentes routes
const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
  },
  {
    path: "/homepage",
    name: "Homepage",
    component: HomePageView,
  },
];

// Instantiation d'une instance de "VueRouter"
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// EXPORT(S)
export default router; // Exportation du router
