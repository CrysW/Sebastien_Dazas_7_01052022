<template>
  <div>
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
              >Profil</router-link
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
    <!-- Liseret -->
    <div class="liseret"></div>
  </div>
</template>

<script>
// EXPORT(S)
export default {
  methods: {
    // Fonction qui permet de deconnecter l'utilisateur
    logout: function () {
      // Suppression des données de l'utilisateur dans le localStorage
      localStorage.clear();
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
// Style du liseret
.liseret {
  width: 100%;
  height: 10px;
  background-color: #d1515a;
}
</style>
