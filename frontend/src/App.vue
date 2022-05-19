<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/HeaderComponent.vue";
export default {
  name: "app",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
// Importation de la police de caractère "Raleway"
@import url("https://fonts.googleapis.com/css2?family=Raleway&display=swap");
// Style appliqué à l'ensemble de l'application
#app {
  font-family: "Raleway", Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  font-size: 16 px;
}
// Style du corps du site
body {
  background-color: #c4c4c4;
}
</style>
