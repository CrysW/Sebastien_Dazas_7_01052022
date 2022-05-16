// IMPORT(S)
require("dotenv").config(); // Importation du package 'dotenv'
const jwt = require("jsonwebtoken"); // Importation du package 'jsonwebtoken' pour l'encodage des 'token'

// EXPORT(S)
// AUTHENTIFICATION : Middleware d'authentification de requête
module.exports = function (req, res, next) {
  try {
    // Récupération du token dans le header authorization de 'En-tête de requête'
    const token = req.headers.authorization.split(" ")[1];
    // Décodage du token
    const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
    // Récupération du 'idUser' qu'il y a à l'intérieur du token déchiffré
    const idUserDecodedToken = decodedToken.idUser;
    // Récupération du 'idUser' contenu dans le body de la requête
    const idUserBodyRequest = req.body.idUser;
    // Récupération de 'idUser' contenu dans l'url
    const idUserUrl = parseInt(req.originalUrl.split("=")[1]);
    // Comparaison du 'idUser' qu'il y a en clair dans le req avec le 'idUser' qu'il y a dans le token
    if (req._body === true) {
      // Contrôle quand ca passe par 'body raw'
      if (idUserBodyRequest === idUserDecodedToken) {
        // console.log("Ca passe par le body raw");
        next();
      } else {
        console.log("---> ERREUR d'authentification dans 'body raw'");
        throw "erreur identification idUser";
      }
    }
    // Contrôle quand ça passe par 'form-data'
    else if (idUserUrl === idUserDecodedToken) {
      // console.log("Ca passe par le form-data");
      next();
    } else {
      console.log("---> ERREUR d'authentification dans 'body form-data'");
      throw "erreur identification idUser";
    }
  } catch (error) {
    res.status(401).json({ message: "Requête non authentifiée ! 😅" });
  }
};
