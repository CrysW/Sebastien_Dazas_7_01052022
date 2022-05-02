//++++++++++++++++++++++++++++++++++++++++++++++++++ LOGIQUE METIER ++++++++++++++++++++++++++++++++++++++++++++++++++

// IMPORT(S)
const bcrypt = require("bcrypt"); // Importation du package de cryptage 'bcrypt'
const mysqlConnection = require("../database/db"); // Importation de la connexion à la base de données mysql

// INSCRIPTION : Middleware pour l'enregistrement de nouveaux utilisateurs
exports.signup = function (req, res, next) {
  bcrypt
    .hash(req.body.password, 10)
    .then(function (hash) {
      // Création du nouvel utilisateur
      const user = {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        emailAdress: req.body.emailAdress,
        password: hash,
      };
      // Requête SQL pour sauvegarder les données dans la base de données
      mysqlConnection.query(
        `INSERT INTO users (lastName, firstName, emailAdress, password) VALUES ("${user.lastName}", "${user.firstName}", "${user.emailAdress}", "${user.password}")`,
        function (error, results, fields) {
          if (error) {
            console.log(error);
            res
              .status(400)
              .json({ message: "Une erreur est survenue ! 😅", error });
          } else {
            res.status(201).json({ message: "L'utilisateur a été crée ! 🥳" });
          }
        }
      );
    })
    .catch(function (error) {
      res.status(500).json({ error: error });
    });
};
