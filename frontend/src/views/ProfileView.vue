<template>
  <div>
    <!-- Header -->
    <Header />
    <h1 class="font-weight-bold text-center">Mon profil</h1>
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col col-sm-12 col-md-8 col-lg-6">
          <div class="card perso-card">
            <div class="card-body">
              <!-- Photo de profil -->
              <img
                class="perso-profil-picture"
                v-bind:src="profilePicture"
                alt="photo de profil"
              />
              <!-- Status -->
              <div class="form-group">
                <label for="status" class="text-white font-weight-bold"
                  >Statut</label
                >
                <input
                  v-model="isAdministrator"
                  type="text"
                  class="perso-status form-control text-center font-weight-bold"
                  id="status"
                  aria-describedby="status"
                  placeholder="Status de l'utilisateur"
                  readonly="readonly"
                />
              </div>
              <!-- Liseret -->
              <div class="liseret"></div>
              <!-- Données de l'utilisateur -->
              <form>
                <!-- Nom de l'utilisateur -->
                <div class="form-group">
                  <label for="lastName" class="text-white font-weight-bold"
                    >Nom</label
                  >
                  <input
                    v-model="lastName"
                    type="text"
                    class="form-control"
                    id="lastName"
                    aria-describedby="lastName"
                    placeholder="Nom de l'utilisateur"
                  />
                </div>
                <!-- Prénom de l'utilisateur -->
                <div class="form-group">
                  <label for="firstName" class="text-white font-weight-bold"
                    >Prénom</label
                  >
                  <input
                    v-model="firstName"
                    type="text"
                    class="form-control"
                    id="firstName"
                    aria-describedby="firstName"
                    placeholder="Prénom de l'utilisateur"
                  />
                </div>
                <!-- Adresse email de l'utilisateur -->
                <div class="form-group">
                  <label for="emailAdress" class="text-white font-weight-bold"
                    >Adresse email</label
                  >
                  <input
                    v-model="emailAdress"
                    type="email"
                    class="form-control"
                    id="emailAdress"
                    aria-describedby="emailAdress"
                    placeholder="Adresse email de l'utilisateur"
                  />
                </div>
                <!-- Mot de passe de l'utilisateur -->
                <div class="form-group">
                  <label for="password" class="text-white font-weight-bold"
                    >Mot de passe</label
                  >
                  <input
                    v-model="password"
                    type="password"
                    class="form-control"
                    id="password"
                    aria-describedby="password"
                    placeholder="Mot de passe de l'utilisateur"
                  />
                </div>
              </form>
              <!-- Liseret -->
              <div class="liseret"></div>
              <!-- Bouton "modifier la photo"-->
              <form class="d-flex justify-content-center">
                <label
                  for="file"
                  class="btn perso-btn font-weight-bold text-white"
                  >Modifier la photo</label
                >
                <input
                  v-on:change="updateProfilPictureUser"
                  type="file"
                  class="d-none"
                  accept="image/*"
                  id="file"
                />
              </form>
              <!-- Bouton "supprimer le compte"-->
              <form
                v-on:submit="submitForm"
                v-on:click="deleteAccount()"
                class="d-flex justify-content-center"
              >
                <button
                  type="submit"
                  class="btn perso-btn perso-btn-danger font-weight-bold text-white"
                >
                  Supprimer le compte
                </button>
              </form>
              <!-- Bouton "enregister"-->
              <form
                v-on:submit="submitForm"
                v-on:click="updateUserData()"
                class="d-flex justify-content-center"
              >
                <button
                  type="submit"
                  class="btn perso-btn font-weight-bold text-white"
                >
                  Enregistrer
                </button>
              </form>
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
  name: "ProfileView",
  // Utilisation des composants
  components: {
    Header,
  },
  // Fonction qui permet de retourner les variables
  data: function () {
    return {
      profilePicture: "",
      isAdministrator: "",
      lastName: "",
      firstName: "",
      emailAdress: "",
      password: "",
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
    // Requête axios pour récupérer les données de l'utilisateurs
    axios
      .get(`http://localhost:3000/api/users/${idUser}`)
      .then((response) => {
        // Affichage dans la console de la reponse
        console.log(
          "---> LA REQUETE A REUSSI => Contenu de 'response.data[0]'"
        );
        console.log(response.data[0]);
        // Pour l'affichage de l'image
        this.profilePicture = response.data[0].profilePicture;
        // Pour l'affichage du lastName
        this.lastName = response.data[0].lastName;
        // Pour l'affichage du firstName
        this.firstName = response.data[0].firstName;
        // Pour l'affichage de l'adresse email
        this.emailAdress = response.data[0].emailAdress;
        // Pour l'affichage du mot de passe
        this.password = response.data[0].password;
        // Pour l'affichage du statut de l'utilisateur
        if (response.data[0].isAdministrator == 0) {
          this.isAdministrator = "Statut utilisateur";
        } else {
          this.isAdministrator = "Statut administrateur";
        }
      })
      .catch((error) => {
        // Affichage dans la console de l'erreur
        console.log("---> LA REQUETE A ECHOUE => Contenu de 'error'");
        console.log(error);
      });
  },
  methods: {
    // Fonction qui permet de mettre à jour la photo de profile
    updateProfilPictureUser: function (event) {
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

      // Récupération du fichier
      console.log("---> Récupération du fichier");
      console.log(event.target.files[0]);
      // Pour l'affichage de l'image
      this.profilePicture = event.target.files[0];
      // Implémentation d'un objet "FormData"
      let formData = new FormData();
      console.log("---> Contenu de 'formData' avant l'ajout de l'image");
      console.log(formData);
      // Ajout du fichier dans "formData"
      formData.append("image", this.profilePicture);
      console.log("---> Contenu de 'formData' après l'ajout de l'image");
      console.log(formData);

      // Requête axios pour modifier la photo de l'utilisateur
      axios
        .put(`http://localhost:3000/api/users/picture/${idUser}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          // Affichage dans la console de la reponse
          console.log(response);
          // Pour l'affichage de l'image
          this.profilePicture = response.data.profilePicture;
          // Rechargement de la page
          window.location.reload();
        })
        .catch((error) => {
          // Affichage dans la console de l'erreur'
          console.log(error);
        });
    },
    // Fonction qui permet de mettre à jour les données de l'utilisateur
    updateUserData: function () {
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

      // Requête axios pour modifier les données de l'utilisateur
      axios
        .put(`http://localhost:3000/api/users/data/${idUser}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          lastName: this.lastName,
          firstName: this.firstName,
          emailAdress: this.emailAdress,
          password: this.password,
        })
        .then((response) => {
          // Affichage dans la console de la reponse
          console.log(response);
          // Rechargement de la page
          window.location.reload();
        })
        .catch((error) => {
          // Affichage dans la console de l'erreur'
          console.log(error);
        });
    },
    // Fonction qui permet de supprimer le compte de l'utilisateur
    deleteAccount: function () {
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

      // Requête axios pour supprimer les données de l'utilisateur
      axios
        .delete(`http://localhost:3000/api/users/${idUser}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          // Affichage dans la console de la reponse
          console.log(response);
        })
        .catch((error) => {
          // Affichage dans la console de l'erreur'
          console.log(error);
        });
      // Suppression des données du localStorage
      localStorage.clear();
      // Navigation vers la page de connexion
      this.$router.push("/");
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
// Style de la card
.perso-card {
  background-color: #112441;
  border-radius: 10px;
}
// Style de la photo de profil
.perso-profil-picture {
  width: 30%;
  height: 30%;
  margin-left: 35%;
  border-radius: 50%;
  margin-top: 20px;
}
// Style du statut
.perso-status {
  background-color: #c4c4c4;
}
.perso-status::placeholder {
  color: #112441;
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
</style>
