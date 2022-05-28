<template>
  <div>
    <Header />
    <h1 class="font-weight-bold text-center">Accueil</h1>
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col col-sm-12 col-md-8 col-lg-6">
          <!-- Cart "ajouter une publication" -->
          <div class="card perso-card">
            <div class="card-body">
              <!-- Message d'instruction -->
              <h2 class="font-weight-bold text-white">Exprimez-vous...</h2>
              <!-- Zone de saisie du message -->
              <div class="form-group">
                <label for="FormControlTextarea"></label>
                <textarea
                  class="form-control"
                  id="FormControlTextarea"
                  rows="3"
                  placeholder="Saisissez votre message entre 10 et 280 caractères"
                ></textarea>
              </div>
              <!-- Liseret -->
              <div class="liseret"></div>
              <!-- Bouton "ajouter une image"-->
              <form class="d-flex justify-content-center">
                <label
                  for="file"
                  class="btn perso-btn font-weight-bold text-white"
                  >Ajouter une image</label
                >
                <input type="file" class="d-none" accept="image/*" id="file" />
              </form>
              <!-- Bouton "publier"-->
              <form class="d-flex justify-content-center">
                <button
                  type="submit"
                  class="btn perso-btn font-weight-bold text-white"
                >
                  Publier
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Cart "publication(s)" -->
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col col-sm-12 col-md-8 col-lg-6">
          <div
            class="card perso-card"
            v-for="publication in publications"
            v-bind:key="publication.idPublication"
          >
            <div class="card-body">
              <div class="d-flex">
                <!-- Photo du publicateur -->
                <img
                  class="perso-profil-picture"
                  v-bind:src="publication.profilePicture"
                  alt="photo de profil"
                />
                <div>
                  <!-- Nom du publicateur -->
                  <p class="perso-name font-weight-bold text-white">
                    {{ publication.firstName }} {{ publication.lastName }}
                  </p>
                  <!-- Date de la publication -->
                  <p class="perso-date font-weight-bold font-italic text-white">
                    {{ publication.publicationDate }}
                  </p>
                </div>
              </div>
              <!-- Liseret -->
              <div class="liseret"></div>
              <!-- Bouton 'modifier' -->
              <form class="d-flex justify-content-center">
                <button
                  type="submit"
                  class="btn perso-btn font-weight-bold text-white"
                >
                  Modifier la publication
                </button>
              </form>
              <!-- Bouton 'supprimer' -->
              <form class="d-flex justify-content-center">
                <button
                  type="submit"
                  class="btn perso-btn perso-btn-danger font-weight-bold text-white"
                >
                  Supprimer la publication
                </button>
              </form>
              <!-- Image de la publication -->
              <div v-if="publication.publicationPicture != null">
                <img
                  class="image-publication"
                  v-bind:src="publication.publicationPicture"
                  alt="photo d'un test"
                />
              </div>
              <!-- Message de la publication -->
              <p class="perso-msg text-white">
                {{ publication.publicationContent }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// IMPORT(S)
import Header from "../components/HeaderComponent.vue"; // Importation du composant "HeaderComponent"
import axios from "axios"; // Importation du package "axios"

// EXPORT(S)
export default {
  name: "HomePage",
  // Utilisation des composants
  components: {
    Header,
  },
  // Fonction qui permet de retourner les variables
  data: function () {
    return {
      publicationDate: "",
      publicationPicture: "",
      publicationContent: "",
      firstName: "",
      lastName: "",
      profilePicture: "",
      publication: {},
      publications: [],
    };
  },
  // Hooks de cycle de vie : Appelé juste après que l'instance a été montée
  mounted() {
    // Récupération de 'user' dans le localStorage
    const userLocalStorage = localStorage.getItem("user");
    console.log("---> Contenu de 'userLocalStorage'");
    console.log(userLocalStorage);
    // Transformation de 'userLocalStorage' qui est une 'String' en 'Object'
    const userLocalStorageToObject = JSON.parse(userLocalStorage);
    console.log("---> Contenu de 'userLocalStorageToObject'");
    console.log(userLocalStorageToObject);

    // Récupération de 'idUser'
    const idUser = userLocalStorageToObject.idUser;
    console.log("---> Récupération de 'idUser'");
    console.log(idUser);
    // Récupération du 'token'
    const token = userLocalStorageToObject.token;
    console.log("---> Récupération du 'token'");
    console.log(token);

    // Requête axios pour récupérer toutes les publications
    axios
      .get("http://localhost:3000/api/publications/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        // Affichage dans la console de la reponse
        console.log(response);
        // Pour l'affichage des publications
        this.publications = response.data.publications;
      })
      .catch((error) => {
        // Affichage de l'erreur dans la console
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
// Style du titre
h1 {
  font-size: 25px;
  text-decoration: underline;
  color: #112441;
}
// Style du sous-titre
h2 {
  margin-top: 20px;
  font-size: 16px;
}
// Style de la card
.perso-card {
  background-color: #112441;
  border-radius: 10px;
  margin-bottom: 10px;
}
// Style du liseret
.liseret {
  width: 100%;
  height: 10px;
  background-color: #d1515a;
  margin-top: 25px;
  margin-bottom: 25px;
}
// Style du bouton
.perso-btn {
  background-color: #d1515a;
  width: 75%;
  margin-bottom: 30px;
  transform: scale(1);
  transition-property: transform;
  transition-duration: 250ms;
}
.perso-btn-danger:hover {
  background-color: #ff0000 !important;
  color: black !important;
  transform: scale(1.2);
}
// Style pour les informations du publicateur
.perso-date {
  margin-bottom: 0px;
}
// Style de la photo de profil
.perso-profil-picture {
  width: 14%;
  height: 14%;
  border: solid white 1px;
  margin-right: 20px;
  border-radius: 50%;
}
// Style de l'image dans la publication
.image-publication {
  width: 100%;
}
// Style du message de la publication
.perso-msg {
  margin-top: 30px;
}
</style>
