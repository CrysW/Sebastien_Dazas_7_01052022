//++++++++++++++++++++++++++++++++++++++++++++++++++ LOGIQUE DE ROUTING ++++++++++++++++++++++++++++++++++++++++++++++++++

// IMPORT(S)
const express = require("express"); // Importation du package 'express'
const publicationCtrl = require("../controllers/publication"); // Importation du controller 'publication'
const multer = require("../middleware/multer"); // Importation du middleware multer
const authentication = require("../middleware/authentication"); // Importation du middleware d'authentification

// CREATION DU ROUTER
const router = express.Router();

// CREATION DES ROUTES
// Route pour ajouter une publication
router.post("/:id", multer, publicationCtrl.addPublication);
// Route pour voir toute les publications
router.get("/", publicationCtrl.seeAllPublications);
// Route pour modifier une publication
router.put("/", authentication, multer, publicationCtrl.updatePublication);
// Route pour supprimer une publication
router.delete("/", authentication, publicationCtrl.deletePublication);

// EXPORT(S)
module.exports = router; // Exportation du router
