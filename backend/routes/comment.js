//++++++++++++++++++++++++++++++++++++++++++++++++++ LOGIQUE DE ROUTING ++++++++++++++++++++++++++++++++++++++++++++++++++

// IMPORT(S)
const express = require("express"); // Importation du package 'express'
const commentCtrl = require("../controllers/comment"); // Importation du controller 'comment'
const authentication = require("../middleware/authentication"); // Importation du middleware d'authentification

// CREATION DU ROUTER
const router = express.Router();

// CREATION DES ROUTES
// Route pour ajouter un commentaire
router.post("/", authentication, commentCtrl.addComment);
// Route pour voir tous les commentaires d'une publication
router.get("/", authentication, commentCtrl.getAllCommentsOfOnePublication);
// Route pour modifier un commentaire
router.put("/", authentication, commentCtrl.updateComment);
// Route pour supprimer un commentaire
router.delete("/", authentication, commentCtrl.deleteComment);

// EXPORT(S)
module.exports = router; // Exportation du router
