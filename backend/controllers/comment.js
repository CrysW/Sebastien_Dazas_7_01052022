//++++++++++++++++++++++++++++++++++++++++++++++++++ LOGIQUE METIER ++++++++++++++++++++++++++++++++++++++++++++++++++

// IMPORT(S)
require("dotenv").config(); // Importation du package 'dotenv'
const mysqlConnection = require("../database/db"); // Importation de la connexion à la base de données mysql

// PUBLIER : Middleware pour ajouter un commentaire
exports.addComment = function (req, res, next) {
  // RECUPERATION DE LA DATE ET DE L'HEURE
  // 1°) Récupération de la date du jour
  const currentDate = JSON.stringify(new Date());
  let nowDate = currentDate.split("T")[0];
  nowDate = nowDate.split('"')[1];
  // 2°) Récupération de l'heure actuelle
  const currentHour = new Date().toString();
  let nowHour = currentHour.split(" ")[4];
  // 3°) Construction de la date du commentaire au format attendu par pour la base de données "AAAA-MM-JJ HH:MM:SS"
  const commentDate = nowDate + " " + nowHour;

  // PUBLICATION DU COMMENTAIRE
  if (
    req.body.commentContent.length >= 10 &&
    req.body.commentContent.length <= 280
  ) {
    // Requête pour envoyer les données dans la base de données
    mysqlConnection.query(
      `INSERT INTO comments (commentDate, commentContent, idUser, idPublication) VALUES("${commentDate}", "${req.body.commentContent}", "${req.params.id}", "${req.body.idPublication}")`,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res
            .status(400)
            .json({ message: "Une erreur est survenue ! 😅", error });
        } else {
          res.status(201).json({ message: "Le commentaire a été crée ! 🥳" });
        }
      }
    );
  } else {
    res.status(400).json({
      message:
        "Le commentaire nécessite un message compris entre 10 et 280 caractères ! 😅",
    });
  }
};
