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
                src="../assets/user-icon.jpg"
                alt="photo de profil"
              />
              <!-- Status -->
              <div class="form-group">
                <label for="status" class="text-white font-weight-bold"
                  >Status</label
                >
                <input
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
                <button
                  type="submit"
                  class="btn perso-btn perso-btn perso-btn font-weight-bold text-white"
                >
                  Modifier la photo
                </button>
              </form>
              <!-- Bouton "supprimer le compte"-->
              <form class="d-flex justify-content-center">
                <button
                  type="submit"
                  class="btn perso-btn perso-btn perso-btn font-weight-bold text-white"
                >
                  Supprimer le compte
                </button>
              </form>
              <!-- Bouton "enregister"-->
              <form class="d-flex justify-content-center">
                <button
                  type="submit"
                  class="btn perso-btn perso-btn perso-btn font-weight-bold text-white"
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

// EXPORT(S)
export default {
  name: "ProfileView",
  components: {
    Header,
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
// Style du statu
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
}
</style>
