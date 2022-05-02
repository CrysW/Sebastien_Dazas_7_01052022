//++++++++++++++++++++++++++++++++++++++++++++++++++ LOGIQUE DE ROUTING ++++++++++++++++++++++++++++++++++++++++++++++++++

// IMPORT(S)
const express = require("express"); // Importation du package 'express'
const userCtrl = require("../controllers/user"); // Importation du controller 'user'
const checkLastName = require("../middleware/checkLastName"); // Importation du middleware de contrôle du nom de famille 'checkLastName'
const checkFirstName = require("../middleware/checkFirstName"); // Importation du middleware de contrôle du prénom 'checkFirstName'
const checkEmail = require("../middleware/checkEmail"); // Importation du middleware de contrôle de l'email 'checkEmail'
const checkPassword = require("../middleware/checkPassword"); // Importation du middleware de contrôle du password 'checkPassword'
const checkConnection = require("../middleware/checkConnection"); // Importation du middleware de limitation de connexion infructueuses

// CREATION DU ROUTER
const router = express.Router();

// CREATION DES ROUTES
// Route pour l'inscription de nouveaux utilisateurs
router.post(
  "/signup",
  checkLastName,
  checkFirstName,
  checkEmail,
  checkPassword,
  userCtrl.signup
);
// Route pour la connexion d'utilisateurs
router.post("/login", checkConnection, userCtrl.login);

// EXPORT(S)
module.exports = router; // Exportation du router