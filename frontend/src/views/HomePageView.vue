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
          <div class="card perso-card">
            <div class="card-body">
              <div class="d-flex">
                <!-- Photo du publicateur -->
                <img
                  class="perso-profil-picture"
                  src="../assets/test-profile.jpg"
                  alt="photo de profil"
                />
                <div>
                  <!-- Nom du publicateur -->
                  <p class="perso-name font-weight-bold text-white">Jane Doe</p>
                  <!-- Date de la publication -->
                  <p class="perso-date font-weight-bold font-italic text-white">
                    Publié le 11/04/2022 à 21:16
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
              <div>
                <img
                  class="image-publication"
                  src="../assets/test-publication.jpg"
                  alt="photo d'un test"
                />
              </div>
              <!-- Message de la publication -->
              <p class="perso-msg text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis dolorum minus autem sint, perspiciatis voluptatem
                accusantium, facilis veritatis voluptas soluta error fugit?
                Debitis, cumque corporis. Vitae molestias deserunt nemo
                perspiciatis.
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

// EXPORT(S)
export default {
  name: "HomePage",
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
