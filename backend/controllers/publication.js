//++++++++++++++++++++++++++++++++++++++++++++++++++ LOGIQUE METIER ++++++++++++++++++++++++++++++++++++++++++++++++++

// IMPORT(S)
require("dotenv").config(); // Importation du package 'dotenv'
const mysqlConnection = require("../database/db"); // Importation de la connexion à la base de données mysql
const fs = require("fs-extra"); // Importation du package file system 'fs'

// PUBLIER : Middleware pour ajouter une publication
exports.addPublication = function (req, res, next) {
  // RECUPERATION DE LA DATE ET DE L'HEURE
  // 1°) Récupération de la date du jour
  const currentDate = JSON.stringify(new Date());
  let nowDate = currentDate.split("T")[0];
  nowDate = nowDate.split('"')[1];
  // 2°) Récupération de l'heure actuelle
  const currentHour = new Date().toString();
  let nowHour = currentHour.split(" ")[4];
  // 3°) Construction de la date de publication au format attendu par pour la base de données "AAAA-MM-JJ HH:MM:SS"
  const publicationDate = nowDate + " " + nowHour;

  // PUBLICATION DU MESSAGE SELON 4 CAS DE FIGURE
  // CAS 1 : Il y a une image et un message
  if (req.file && req.body.publication) {
    // Récupération des données contenu dans req.body.publication
    const dataReqBodyPublication = JSON.parse(req.body.publication);
    // Récupération de l'image dans req.file.filename
    const dataReqFile = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    if (
      dataReqBodyPublication.publicationContent.length >= 10 &&
      dataReqBodyPublication.publicationContent.length <= 280
    ) {
      // Requête SQL pour envoyer les données dans la base de données
      mysqlConnection.query(
        `INSERT INTO publications (publicationDate, publicationContent, publicationPicture, idUser) VALUES ("${publicationDate}", "${dataReqBodyPublication.publicationContent}", "${dataReqFile}", "${req.params.id}")`,
        function (error, results, fields) {
          if (error) {
            console.log(error);
            res
              .status(400)
              .json({ message: "Une erreur est survenue ! 😅", error });
          } else {
            res.status(201).json({ message: "La publication a été crée ! 🥳" });
          }
        }
      );
    } else {
      // Récupération du nom de l'image à ne pas sauvegarder côté serveur
      let pictureNotToSave = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
      pictureNotToSave = pictureNotToSave.split("/")[4];
      // Suppression de l'image dans le dossier 'images'
      fs.removeSync(`images/${pictureNotToSave}`);
      // Envoi de la réponse du serveur
      res.status(400).json({
        message:
          "La publication nécessite un message compris entre 10 et 280 caractères ! 😅",
      });
    }
  }
  // CAS 2 : Il y a une image mais pas de message
  else if (req.file && !req.body.publication) {
    // Récupération de l'image dans req.file.filename
    const dataReqFile = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    // Requête SQL pour envoyer les données dans la base de données
    mysqlConnection.query(
      `INSERT INTO publications (publicationDate, publicationPicture, idUser) VALUES ("${publicationDate}", "${dataReqFile}", "${req.params.id}")`,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res
            .status(400)
            .json({ message: "Une erreur est survenue ! 😅", error });
        } else {
          res.status(201).json({ message: "La publication a été crée ! 🥳" });
        }
      }
    );
  }
  // CAS 3 : Il n'y pas d'image mais un message
  else if (!req.file && req.body.publication) {
    // Récupération des données contenu dans req.body.publication
    const dataReqBodyPublication = JSON.parse(req.body.publication);
    if (
      dataReqBodyPublication.publicationContent.length >= 10 &&
      dataReqBodyPublication.publicationContent.length <= 280
    ) {
      // Requête SQL pour envoyer les données dans la base de données
      mysqlConnection.query(
        `INSERT INTO publications (publicationDate, publicationContent, idUser) VALUES ("${publicationDate}", "${dataReqBodyPublication.publicationContent}", "${req.params.id}")`,
        function (error, results, fields) {
          if (error) {
            console.log(error);
            res
              .status(400)
              .json({ message: "Une erreur est survenue ! 😅", error });
          } else {
            res.status(201).json({ message: "La publication a été crée ! 🥳" });
          }
        }
      );
    } else {
      res.status(400).json({
        message:
          "La publication nécessite un message compris entre 10 et 280 caractères ! 😅",
      });
    }
  }
  // CAS 4 : Il n'y pas d'image et pas de message
  else if (!req.file && !req.body.publication) {
    res.status(400).json({
      message: "La publication nécessite au minimum une image ou un texte ! 😅",
    });
  }
};

// VOIR TOUTE LES PUBLICATIONS : Middleware pour ajouter une publication
exports.seeAllPublications = function (req, res, next) {
  // Requête SQL pour chercher toutes les publications dans la base de données
  mysqlConnection.query(
    `SELECT idPublication, firstName, lastName, profilePicture, CAST(publicationDate AS CHAR) AS publicationDate, publicationPicture, publicationContent FROM users INNER JOIN publications ON users.idUser = publications.idUser ORDER BY idPublication DESC;`,
    function (error, results, fields) {
      if (error) {
        res
          .status(400)
          .json({ message: "Une erreur est survenue ! 😅", error });
      } else {
        res.status(200).json(results);
      }
    }
  );
};
