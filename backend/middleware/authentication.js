// IMPORT(S)
require("dotenv").config(); // Importation du package 'dotenv'
const jwt = require("jsonwebtoken"); // Importation du package 'jsonwebtoken' pour l'encodage des 'token'

// EXPORT(S)
// AUTHENTIFICATION : Middleware d'authentification de requête
module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
    const idUser = decodedToken.idUser;
    if (req.body.idUser && req.body.idUser !== idUser) {
      throw "idUser non valide";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "Requête non authentifiée ! 😅" });
  }
};
