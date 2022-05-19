<template>
  <nav class="navbar navbar-expand-lg navbar-dark perso_bg_blue">
    <a class="navbar-brand" href=""
      ><img
        src="../assets/logo-groupomania.png"
        alt="logo"
        width=""
        height="40px"
    /></a>
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
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item mx-2">
          <router-link class="nav-link text-white" to="/signup"
            >Inscription</router-link
          >
        </li>
        <li class="nav-item mx-2">
          <router-link class="nav-link text-white" to="/login"
            >Connexion</router-link
          >
        </li>
        <li class="nav-item mx-2">
          <router-link class="nav-link text-white" to="/profile"
            >Profile</router-link
          >
        </li>
        <li class="nav-item mx-2">
          <router-link class="nav-link text-white" to="/homepage"
            >Accueil</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.perso_bg_blue {
  background: #112441;
}
.nav-link {
  font-size: 25px;
}
.nav-link:hover {
  color: #d1515a !important;
}
</style>
