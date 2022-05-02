// IMPORT(S)
const multer = require("multer"); // Importation du package 'multer'

// Création d'un dictionnaire 'MIME_TYPES'
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Destination de stockage du fichier et génération du nom du fichier unique
const storage = multer.diskStorage({
  // Destination de stockage du fichier
  destination: function (req, file, callback) {
    callback(null, "images");
  },
  // Génération du nom du fichier unique
  filename: function (req, file, callback) {
    // Suppression des espaces dans le nom du fichier
    const name = file.originalname.split(" ").join("_");
    // Rajout de l'extension du fichier en utilisant des MIME_TYPES
    const extension = MIME_TYPES[file.mimetype];
    // Création du nom du fichier
    callback(null, name + Date.now() + "." + extension);
  },
});

// EXPORT(S)
// MULTER : Middleware pour gérer les requêtes HTTP avec envoie de fichier
module.exports = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
}).single("image");
