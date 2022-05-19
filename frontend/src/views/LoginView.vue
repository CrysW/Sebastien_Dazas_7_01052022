<template>
  <div>
    <h1 class="font-weight-bold">Se connecter</h1>
    <br />
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-sm-12 col-md-8 col-lg-6">
          <p>
            Avec Groupomania, partagez et restez en contact avec vos collégues
          </p>
        </div>
      </div>
      <br />
      <div class="row d-flex justify-content-center">
        <div class="col-sm-12 col-md-8 col-lg-6">
          <div class="card perso-bgc-card perso-radius-card">
            <div class="card-body">
              <form>
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
                <!-- Liseret -->
                <div class="liseret"></div>
                <!-- Bouton "se connecter" -->
                <button
                  type="submit"
                  class="btn perso-width-btn perso-margin-btn perso-bg-btn font-weight-bold text-white"
                >
                  Se connecter
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
export default {};
</script>

<style lang="scss" scoped>
// Style du titre
h1 {
  font-size: 25px;
  text-decoration: underline;
  color: #112441;
}
// Style de l'accroche
p {
  font-size: 25px;
  color: #112441;
}
// Style de la card
.perso-bgc-card {
  background-color: #112441;
}
.perso-radius-card {
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
// Style du bouton
.perso-bg-btn {
  background-color: #d1515a;
}
.perso-width-btn {
  width: 50%;
}
.perso-margin-btn {
  margin-bottom: 20px;
}
</style>
