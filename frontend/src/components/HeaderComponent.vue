<template>
  <nav class="navbar navbar-expand-lg navbar-dark perso-navbar">
    <!-- Logo et nom de l'entreprise -->
    <img
      class="navbar-brand"
      src="../assets/logo-groupomania.png"
      alt="logo"
      width=""
      height="50px"
    />
    <!-- Bouton 'hamburger' pour la navigation sur les écrans plus petits -->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- Barre de navigation -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item mx-3">
          <router-link class="nav-link text-white" to="/profile"
            >Profile</router-link
          >
        </li>
        <li class="nav-item mx-3">
          <router-link class="nav-link text-white" to="/homepage"
            >Accueil</router-link
          >
        </li>
        <li class="nav-item mx-3">
          <a v-on:click="logout()" class="nav-link text-white" to="/"
            >Deconnexion</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
// EXPORT(S)
export default {
  methods: {
    // Fonction qui permet de deconnecter l'utilisateur
    logout: function () {
      // Affichage du contenu du localStorage dans la console
      console.log("---> Contenu du localStorage avant suppression");
      console.log(localStorage);
      // Suppression des données de l'utilisateur dans le localStorage
      localStorage.clear();
      // Affichage du contenu du localStorage dans la console
      console.log("---> Contenu du localStorage après suppression");
      console.log(localStorage);
      // Navigation vers la page de connexion/inscription
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
// Style de la barre de navigation
.perso-navbar {
  background: #112441;
}
// Style pour la taille de police de caractères des liens
.nav-link {
  font-size: 25px;
}
// Style pour le curseur des liens dans la barre de navigation
a {
  cursor: pointer;
}
// Style pour le survole des liens dans la barre de navigation
.nav-link:hover {
  color: #d1515a !important;
}
</style>
