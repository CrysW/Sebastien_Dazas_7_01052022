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
                v-if="mode == 'login'"
                type="submit"
                class="btn perso-btn font-weight-bold text-white"
              >
                Se connecter
              </button>
              <button
                v-else
                type="submit"
                class="btn perso-btn font-weight-bold text-white"
              >
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Nom du composant
  name: "LoginView",
  // Fonction qui permet de retourner les données
  data: function () {
    return {
      mode: "login",
    };
  },
  methods: {
    // Fonction qui permet de 'switcher" vers la vue en mode 'inscription'
    switchToCreateAccount() {
      this.mode = "signup";
    },
    // Fonction qui permet de 'switcher' vers la vue en mode 'connexion'
    switchToLogin() {
      this.mode = "login";
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
