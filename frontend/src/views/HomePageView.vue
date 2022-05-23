<template>
  <div>
    <Header />
    <h1>Bienvenue sur la page d'accueil</h1>
  </div>
</template>

<script>
// IMPORT(S)
import Header from "../components/HeaderComponent.vue"; // Importation du composant "HeaderComponent"

// EXPORT(S)
export default {
  name: "HomePage",
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped></style>
