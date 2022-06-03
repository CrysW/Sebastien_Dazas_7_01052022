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
                  v-model="publicationContent"
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
                <input
                  v-on:change="addPicture"
                  type="file"
                  class="d-none"
                  accept="image/*"
                  id="file"
                />
              </form>
              <!-- Bouton "publier"-->
              <form
                v-on:submit="submitForm"
                v-on:click="addPublication()"
                class="d-flex justify-content-center"
              >
                <button
                  type="submit"
                  class="btn perso-btn font-weight-bold text-white"
                >
                  Publier
                </button>
              </form>
            </div>
            <!-- Affichage du message d'erreur -->
            <p class="font-italic text-center text-white">{{ error }}</p>
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
              <form
                v-on:submit="submitForm"
                v-on:click="switchToModify()"
                v-on:dblclick="switchToNoModify()"
                class="d-flex justify-content-center"
              >
                <button
                  v-if="publication.idUser == idUser"
                  type="submit"
                  class="btn perso-btn font-weight-bold text-white"
                >
                  Modifier la publication
                </button>
              </form>
              <!-- Pour la modification de la publication -->
              <div>
                <!-- Liseret -->
                <div
                  v-if="(mode == 'true') & (publication.idUser == idUser)"
                  class="liseret bg-light"
                ></div>
                <!-- Message d'instruction -->
                <h2
                  v-if="(mode == 'true') & (publication.idUser == idUser)"
                  class="font-weight-bold text-white"
                >
                  Alors on s'est trompé 😁 ?
                </h2>
                <!-- Zone du message -->
                <div
                  v-if="(mode == 'true') & (publication.idUser == idUser)"
                  class="form-group"
                >
                  <label for="FormControlTextarea"></label>
                  <textarea
                    v-model="publicationContent"
                    class="form-control"
                    id="FormControlTextarea"
                    rows="3"
                    placeholder="Saisissez votre message entre 10 et 280 caractères"
                  ></textarea>
                </div>
                <!-- Liseret -->
                <div
                  v-if="(mode == 'true') & (publication.idUser == idUser)"
                  class="liseret bg-light"
                ></div>
                <!-- Bouton "ajouter une image"-->
                <form
                  v-if="(mode == 'true') & (publication.idUser == idUser)"
                  class="d-flex justify-content-center"
                >
                  <label
                    for="file"
                    class="btn perso-btn font-weight-bold text-white"
                    >Ajouter une image</label
                  >
                  <input
                    v-on:change="addPicture"
                    type="file"
                    class="d-none"
                    accept="image/*"
                    id="file"
                  />
                </form>
                <!-- Bouton "publier"-->
                <form
                  v-if="(mode == 'true') & (publication.idUser == idUser)"
                  v-on:submit="submitForm"
                  v-on:click="updatePublication(publication.idPublication)"
                  class="d-flex justify-content-center"
                >
                  <button
                    type="submit"
                    class="btn perso-btn font-weight-bold text-white"
                  >
                    Publier
                  </button>
                </form>
                <!-- Affichage du message d'erreur -->
                <p
                  v-if="(mode == 'true') & (publication.idUser == idUser)"
                  class="font-italic text-center text-white"
                >
                  {{ error }}
                </p>
                <!-- Liseret -->
                <div
                  v-if="(mode == 'true') & (publication.idUser == idUser)"
                  class="liseret bg-light"
                ></div>
              </div>
              <!-- Bouton 'supprimer' -->
              <form
                v-on:submit="submitForm"
                v-on:click="deletePublication(publication.idPublication)"
                class="d-flex justify-content-center"
              >
                <button
                  v-if="publication.idUser == idUser || isAdministrator == '1'"
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
      idUser: JSON.parse(localStorage.getItem("user")).idUser,
      isAdministrator: JSON.parse(localStorage.getItem("user")).isAdministrator,
      firstName: "",
      lastName: "",
      profilePicture: "",
      publication: {},
      publications: [],
      error: "",
      mode: "",
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
    // Récupération de 'isAdministrator'
    const isAdministrator = userLocalStorageToObject.isAdministrator;
    console.log("---> Récupération de 'isAdministrator'");
    console.log(isAdministrator);
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
  methods: {
    // Fonction qui permet d'ajouter une image
    addPicture: function (event) {
      // Pour l'affichage de l'image
      this.publicationPicture = event.target.files[0];
    },
    // Fonction qui permet d'ajouter une publication
    addPublication: function () {
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

      // PUBLICATION DU MESSAGE SELON 4 CAS DE FIGURE
      // CAS 1 : Il y a une image et un message
      if (this.publicationContent && this.publicationPicture) {
        if (
          this.publicationContent.length < 10 ||
          this.publicationContent.length > 280
        ) {
          // Message d'erreur qui sera affiché sur le frontend
          this.error =
            "La publication nécessite un message compris entre 10 et 280 caractères ! 😅";
          // Attente de rechargement de la page
          setTimeout(function () {
            // Affichage du message dans la console
            console.log("J'attend 3 secondes avant de disparaître");
            // Rechargement de la page
            window.location.reload();
          }, 3000);
        } else {
          // Implémentation d'un objet "FormData"
          const formData = new FormData();
          // Ajout du message et de l'image dans "formData"
          formData.append("image", this.publicationPicture);
          formData.append(
            "publication",
            JSON.stringify({ publicationContent: this.publicationContent })
          );
          // Requête axios pour créer une publication
          axios
            .post(
              `http://localhost:3000/api/publications/${idUser}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + token,
                },
              }
            )
            .then((response) => {
              // Affichage dans la console de la reponse
              console.log(response);
              // Rechargement de la page
              window.location.reload();
            })
            .catch((error) => {
              // Affichage dans la console de l'erreur
              console.log(error);
            });
        }
      }

      // CAS 2 : Il y a une image mais pas de message
      if (this.publicationPicture && !this.publicationContent) {
        // Implémentation d'un objet "FormData"
        const formData = new FormData();
        // Ajout de l'image dans "formData"
        formData.append("image", this.publicationPicture);
        // Requête axios pour créer une publication
        axios
          .post(`http://localhost:3000/api/publications/${idUser}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            // Affichage dans la console de la reponse
            console.log(response);
            // Rechargement de la page
            window.location.reload();
          })
          .catch((error) => {
            // Affichage dans la console de l'erreur
            console.log(error);
          });
      }

      // CAS 3 : Il n'y pas d'image mais un message
      if (this.publicationContent && !this.publicationPicture) {
        if (
          this.publicationContent.length < 10 ||
          this.publicationContent.length > 280
        ) {
          // Message d'erreur qui sera affiché sur le frontend
          this.error =
            "La publication nécessite un message compris entre 10 et 280 caractères ! 😅";
          // Attente de rechargement de la page
          setTimeout(function () {
            // Affichage du message dans la console
            console.log("J'attend 3 secondes avant de disparaître");
            // Rechargement de la page
            window.location.reload();
          }, 3000);
        } else {
          // Implémentation d'un objet "FormData"
          const formData = new FormData();
          // Ajout du message dans "formData"
          formData.append(
            "publication",
            JSON.stringify({ publicationContent: this.publicationContent })
          );
          // Requête axios pour créer une publication
          axios
            .post(
              `http://localhost:3000/api/publications/${idUser}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + token,
                },
              }
            )
            .then((response) => {
              // Affichage dans la console de la reponse
              console.log(response);
              // Rechargement de la page
              window.location.reload();
            })
            .catch((error) => {
              // Affichage dans la console de l'erreur
              console.log(error);
            });
        }
      }

      // CAS 4 : Il n'y pas d'image et pas de message
      if (!this.publicationContent & !this.publicationPicture) {
        // Message d'erreur qui sera affiché sur le frontend
        this.error =
          "La publication nécessite au minimum une image ou un texte ! 😅";
        // Attente de rechargement de la page
        setTimeout(function () {
          // Affichage du message dans la console
          console.log("J'attend 3 secondes avant de disparaître");
          // Rechargement de la page
          window.location.reload();
        }, 3000);
      }
    },
    // Fonction qui permet de supprimer une publication
    deletePublication: function (idPublication) {
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

      // Requête axios pour supprimer une publication
      axios
        .delete(`http://localhost:3000/api/publications/${idPublication}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: {
            idPublication: this.idPublication,
          },
        })
        .then((response) => {
          // Affichage dans la console de la reponse
          console.log(response);
          // Rechargement de la page
          window.location.reload();
        })
        .catch((error) => {
          // Affichage dans la console de l'erreur
          console.log(error);
        });
    },

    // Fonction qui permet de 'switcher" en mode 'modification'
    switchToModify: function () {
      this.mode = "true";
    },

    // Fonction qui permet de 'switcher" en mode 'annulation de la modification'
    switchToNoModify: function () {
      this.mode = "false";
    },

    // Fonction qui permet de mettre à jour la publication
    updatePublication: function (idPublication) {
      // Récupération de 'idPublication'
      const idPost = idPublication;
      console.log("---> Récupération de 'idPublication'");
      console.log(idPost);
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

      // MODIFICATION DE LA PUBLICATION SELON 3 CAS DE FIGURE
      // CAS 1 : Il y a une image et un message à mettre à jour
      if (this.publicationContent && this.publicationPicture) {
        if (
          this.publicationContent.length < 10 ||
          this.publicationContent.length > 280
        ) {
          // Message d'erreur qui sera affiché sur le frontend
          this.error =
            "La publication nécessite un message compris entre 10 et 280 caractères ! 😅";
          // Attente de rechargement de la page
          setTimeout(function () {
            // Affichage du message dans la console
            console.log("J'attend 3 secondes avant de disparaître");
            // Rechargement de la page
            window.location.reload();
          }, 3000);
        } else {
          // Implémentation d'un objet "FormData"
          const formData = new FormData();
          // Ajout du message et de l'image dans "formData"
          formData.append("image", this.publicationPicture);
          formData.append(
            "publication",
            JSON.stringify({ publicationContent: this.publicationContent })
          );
          // Requête axios pour modifier une publication
          axios
            .put(`http://localhost:3000/api/publications/${idPost}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + token,
              },
            })
            .then((response) => {
              // Affichage dans la console de la reponse
              console.log(response);
              // Rechargement de la page
              window.location.reload();
            })
            .catch((error) => {
              // Affichage dans la console de l'erreur
              console.log(error);
            });
        }
      }

      // CAS 2 : Il y a une image à mettre à jour uniquement
      if (this.publicationPicture && !this.publicationContent) {
        // Implémentation d'un objet "FormData"
        const formData = new FormData();
        // Ajout de l'image dans "formData"
        formData.append("image", this.publicationPicture);
        // Requête axios pour modifier une publication
        axios
          .put(`http://localhost:3000/api/publications/${idPost}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            // Affichage dans la console de la reponse
            console.log(response);
            // Rechargement de la page
            window.location.reload();
          })
          .catch((error) => {
            // Affichage dans la console de l'erreur
            console.log(error);
          });
      }

      // CAS 3 : Il y a un message à mettre à jour uniquement
      if (this.publicationContent && !this.publicationPicture) {
        if (
          this.publicationContent.length < 10 ||
          this.publicationContent.length > 280
        ) {
          // Message d'erreur qui sera affiché sur le frontend
          this.error =
            "La publication nécessite un message compris entre 10 et 280 caractères ! 😅";
          // Attente de rechargement de la page
          setTimeout(function () {
            // Affichage du message dans la console
            console.log("J'attend 3 secondes avant de disparaître");
            // Rechargement de la page
            window.location.reload();
          }, 3000);
        } else {
          // Implémentation d'un objet "FormData"
          const formData = new FormData();
          // Ajout du message dans "formData"
          formData.append(
            "publication",
            JSON.stringify({ publicationContent: this.publicationContent })
          );
          // Requête axios pour modifier une publication
          axios
            .put(`http://localhost:3000/api/publications/${idPost}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + token,
              },
            })
            .then((response) => {
              // Affichage dans la console de la reponse
              console.log(response);
              // Rechargement de la page
              window.location.reload();
            })
            .catch((error) => {
              // Affichage dans la console de l'erreur
              console.log(error);
            });
        }
      }
    },

    // Fonction qui permet d'empêcher la soumission du formulaire
    submitForm: function (e) {
      e.preventDefault();
    },
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
