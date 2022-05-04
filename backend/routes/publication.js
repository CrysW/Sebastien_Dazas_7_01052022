//++++++++++++++++++++++++++++++++++++++++++++++++++ LOGIQUE DE ROUTING ++++++++++++++++++++++++++++++++++++++++++++++++++

// IMPORT(S)
const express = require("express"); // Importation du package 'express'
const publicationCtrl = require("../controllers/publication"); // Importation du controller 'publication'
const multer = require("../middleware/multer"); // Importation du middleware multer

// CREATION DU ROUTER
const router = express.Router();

// CREATION DES ROUTES
// Route pour ajouter une publication
router.post("/:id", multer, publicationCtrl.addPublication);

// EXPORT(S)
module.exports = router; // Exportation du router
