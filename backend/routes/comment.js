//++++++++++++++++++++++++++++++++++++++++++++++++++ LOGIQUE DE ROUTING ++++++++++++++++++++++++++++++++++++++++++++++++++

// IMPORT(S)
const express = require("express"); // Importation du package 'express'
const commentCtrl = require("../controllers/comment"); // Importation du controller 'comment'

// CREATION DU ROUTER
const router = express.Router();

// CREATION DES ROUTES
// Route pour ajouter un commentaire
router.post("/:id", commentCtrl.addComment);

// EXPORT(S)
module.exports = router; // Exportation du router
