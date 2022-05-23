<template>
  <div>
    <div class="container">
      <div class="row d-flex justify-content-center mt-5">
        <div class="col-sm-12 col-md-8 col-lg-6">
          <div class="card perso-card">
            <div class="card-body">
              <!-- Logo de Groupomania -->
              <img
                src="../assets/logo-groupomania.png"
                alt="Logo de Groupomania"
                width="100%"
              />
              <!-- Slogan -->
              <p class="text-center text-white mt-3">
                Avec Groupomania, partagez et restez en contact avec vos
                collégues
              </p>
              <!-- Titre -->
              <h1
                v-if="mode == 'login'"
                class="font-weight-bold text-center text-white"
              >
                Connexion
              </h1>
              <h1 v-else class="font-weight-bold text-center text-white">
                Inscription
              </h1>
              <!-- Formulaire -->
              <form>
                <!-- Saisie du nom -->
                <div v-if="mode == 'signup'" class="form-group">
                  <label for="lastName"></label>
                  <input
                    v-model="lastName"
                    type="text"
                    class="form-control"
                    id="lastName"
                    aria-describedby="lastName"
                    placeholder="Saisissez votre nom"
                  />
                </div>
                <!-- Saisie du prénom -->
                <div v-if="mode == 'signup'" class="form-group">
                  <label for="firstName"></label>
                  <input
                    v-model="firstName"
                    type="text"
                    class="form-control"
                    id="firstName"
                    aria-describedby="firstName"
                    placeholder="Saisissez votre prénom"
                  />
                </div>
                <!-- Saisie de l'adresse email -->
                <div class="form-group">
                  <label for="emailAdress"></label>
                  <input
                    v-model="emailAdress"
                    type="email"
                    class="form-control"
                    id="emailAdress"
                    aria-describedby="emailAdress"
                    placeholder="Saisissez votre adresse email"
                  />
                </div>
                <!-- Saisie du mot de passe -->
                <div class="form-group">
                  <label for="password"></label>
                  <input
                    v-model="password"
                    type="password"
                    class="form-control"
                    id="password"
                    aria-describedby="password"
                    placeholder="Saisissez votre mot de passe"
                  />
                </div>
              </form>
              <!-- Liseret -->
              <div class="liseret"></div>
              <!-- Question à l'utilisateur -->
              <p v-if="mode == 'login'" class="text-center text-white mb-5">
                Vous n'avez pas encore de compte ?
                <span class="login" v-on:click="switchToCreateAccount()"
                  >Créer un compte</span
                >
              </p>
              <p v-else class="text-center text-white mb-5">
                Vous avec déja un compte ?
                <span class="login" v-on:click="switchToLogin()"
                  >Se connecter</span
                >
              </p>
              <!-- Bouton -->
              <button
                v-on:click="login()"
                v-if="mode == 'login'"
                type="submit"
                class="btn perso-btn font-weight-bold text-white"
              >
                Se connecter
              </button>
              <button
                v-on:click="signup()"
                v-else
                type="submit"
                class="btn perso-btn font-weight-bold text-white"
              >
                S'inscrire
              </button>
              <!-- Affichage du message d'erreur -->
              <p class="font-italic text-center text-white">
                {{ error }}
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
import axios from "axios"; // Importation du package "axios"

// EXPORT(S)
export default {
  // Nom du composant
  name: "LoginView",
  // Fonction qui permet de retourner les variables
  data: function () {
    return {
      mode: "login",
      firstName: "",
      lastName: "",
      emailAdress: "",
      password: "",
      error: "",
    };
  },
  methods: {
    // Fonction qui permet de 'switcher" vers la vue en mode 'inscription'
    switchToCreateAccount: function () {
      this.mode = "signup";
    },
    // Fonction qui permet de 'switcher' vers la vue en mode 'connexion'
    switchToLogin: function () {
      this.mode = "login";
    },
    // Fonction qui permet de se connecter
    login: function () {
      // Requête axios pour connecter l'utilisateur
      axios
        .post("http://localhost:3000/api/users/login", {
          emailAdress: this.emailAdress,
          password: this.password,
        })
        .then((response) => {
          // Affichage dans la console de la reponse
          console.log("---> LA REQUETE A REUSSI => Contenu de 'response.data'");
          console.log(response.data);
          // Création d'un objet 'user' contenant les données de la requête 'post'
          const user = response.data;
          // Sauvegarde des données de l'utilisateur dans le localStorage
          localStorage.setItem("user", JSON.stringify(user));
          // Navigation vers la page d'accueil
          this.$router.push("/homepage");
        })
        .catch((error) => {
          // Affichage dans la console de l'erreur
          console.log("---> LA REQUETE A ECHOUE => Contenu de 'error'");
          console.log(error);
          if (error.response) {
            if (error.response.data.message) {
              // Affichage dans la console du message d'erreur provenant du backend
              console.log(
                "---> MESSAGE D'ERREUR PROVENANT DU BACKEND => Contenu de 'error.response.data.message'"
              );
              console.log(error.response.data.message);
              // Message d'erreur qui sera affiché sur le frontend
              this.error = error.response.data.message;
            } else if (error.response.data) {
              // Affichage dans la console du message d'erreur provenant du backend
              console.log(
                "---> MESSAGE D'ERREUR PROVENANT DU BACKEND => Contenu de 'error.response.data.message'"
              );
              console.log(error.response.data);
              // Message d'erreur qui sera affiché sur le frontend
              this.error = error.response.data;
            }
          }
        });
    },
    // Fonction qui permet de s'inscrire
    signup: function () {
      const mySelf = this;
      // Requête axios pour inscrire un utilisateur
      axios
        .post("http://localhost:3000/api/users/signup", {
          lastName: this.lastName,
          firstName: this.firstName,
          emailAdress: this.emailAdress,
          password: this.password,
        })
        .then((response) => {
          // Affichage dans la console de la reponse
          console.log("---> LA REQUETE A REUSSI => Contenu de 'response.data'");
          console.log(response.data);
          // Connexion de l'utilisateur
          mySelf.login();
        })
        .catch((error) => {
          // Affichage dans la console de l'erreur
          console.log("---> LA REQUETE A ECHOUE => Contenu de 'error'");
          console.log(error);
          if (error.response) {
            // Affichage dans la console du message d'erreur provenant du backend
            console.log(
              "---> MESSAGE D'ERREUR PROVENANT DU BACKEND => Contenu de 'error.response.data.message'"
            );
            console.log(error.response.data.message);
            // Message d'erreur qui sera affiché sur le frontend
            this.error = error.response.data.message;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
// Style du titre
h1 {
  font-size: 40px;
}
// Style du slogan
p {
  font-size: 20px;
  color: #112441;
}
// Style de la card
.perso-card {
  background-color: #112441;
  border-radius: 10px;
}
// Style du liseret
.liseret {
  width: 100%;
  height: 10px;
  background-color: #d1515a;
  margin-top: 40px;
  margin-bottom: 40px;
}
// Style de la question
.login {
  text-decoration: underline;
  cursor: pointer;
}
// Style du bouton
.perso-btn {
  background-color: #d1515a;
  font-size: 20px;
  width: 50%;
  margin-left: 25%;
  margin-bottom: 20px;
}
</style>
