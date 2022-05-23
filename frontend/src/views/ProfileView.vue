<template>
  <div>
    <Header />
    <h1>Bienvenue sur la page de profile</h1>
  </div>
</template>

<script>
// IMPORT(S)
import Header from "../components/HeaderComponent.vue"; // Importation du composant "HeaderComponent"

// EXPORT(S)
export default {
  name: "ProfileView",
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped></style>
