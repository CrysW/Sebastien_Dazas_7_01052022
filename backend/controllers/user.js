//++++++++++++++++++++++++++++++++++++++++++++++++++ LOGIQUE METIER ++++++++++++++++++++++++++++++++++++++++++++++++++

// IMPORT(S)
require("dotenv").config(); // Importation du package 'dotenv'
const bcrypt = require("bcrypt"); // Importation du package de cryptage 'bcrypt'
const mysqlConnection = require("../database/db"); // Importation de la connexion à la base de données mysql
const jwt = require("jsonwebtoken"); // Importation du package 'jsonwebtoken' pour l'encodage des 'Token'
const fs = require("fs-extra"); // Importation du package file system 'fs'

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

// CONNEXION : Middleware pour connecter les utilisateurs
exports.login = function (req, res, next) {
  // Récupération de l'email lors de la requête
  const email = req.body.emailAdress;

  // Requête SQL pour chercher si l'email de l'utilisateur est présent dans la base de données
  mysqlConnection.query(
    `SELECT * FROM users WHERE emailAdress="${email}"`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res
          .status(400)
          .json({ message: "Une erreur est survenue ! 😅", error });
      } else {
        // Si l'email de l'utilisateur n'est pas présent dans la base de données
        if (results == 0) {
          return res.status(404).json({
            message: `L'adresse email '${email}' est inexistante dans la base de donnée ! 😅`,
          });
        } else {
          // Contrôler la validité du password
          bcrypt
            .compare(req.body.password, results[0].password)
            .then(function (controlPassword) {
              // Le mot de passe ne correspond pas
              if (!controlPassword) {
                return res
                  .status(400)
                  .json({ message: "Le mot de passe est incorrect ! 😅" });
              }
              // Le mot de passe correspond
              // Génération du token JWT
              const token = jwt.sign(
                { idUser: results[0].idUser },
                `${process.env.SECRET_TOKEN}`,
                { expiresIn: "24h" }
              );
              // Réponse du serveur avec le 'idUser' et le 'token'
              res.status(201).json({
                idUser: results[0].idUser,
                token: token,
              });
            })
            .catch(function (error) {
              response.status(500).json({ error: error });
            });
        }
      }
    }
  );
};

// VOIR TOUS LES UTILISATEURS : Middleware pour voir tous les utilisateurs
exports.seeAllUsers = function (req, res, next) {
  // Requête SQL pour chercher les utilisateurs dans la base de données
  mysqlConnection.query(
    `SELECT * FROM users`,
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

// VOIR UN UTILISATEUR : Middleware pour voir un utilisateur
exports.seeOneUser = function (req, res, next) {
  // Requête SQL pour chercher l'utilisateur dans la base de données
  mysqlConnection.query(
    `SELECT * FROM users WHERE idUser="${req.params.id}"`,
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

// MODIFIER LA PHOTO DE PROFIL DE L'UTILISATEUR : Middleware pour modifier la photo de profil de l'utilisateur
exports.updateProfilPictureUser = function (req, res, next) {
  if (req.file) {
    // Requête SQL pour récupérer la photo de profil à supprimer dans la base de données
    mysqlConnection.query(
      `SELECT profilePicture FROM users WHERE idUser=${req.params.id};`,
      function (error, results, fields) {
        if (error) {
          res
            .status(400)
            .json({ message: "Une erreur est survenue ! 😅", error });
        } else {
          const pictureToDelete = results[0].profilePicture.split("/images")[1];
          const pictureToAdd = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
          // Suppression de l'image dans le dossier 'images' du serveur
          fs.removeSync(`images/${pictureToDelete}`);
          // Requête SQL pour mettre à jour la photo de profil dans la base de données
          mysqlConnection.query(
            `UPDATE users SET profilePicture = "${pictureToAdd}" WHERE users.idUser = "${req.params.id}"`,
            function (error, results, fields) {
              if (error) {
                res
                  .status(400)
                  .json({ message: "Une erreur est survenue ! 😅", error });
              } else {
                res.status(200).json({
                  message:
                    "La photo de profil a été mises à jour dans la base de données ! 🥳",
                });
              }
            }
          );
        }
      }
    );
  } else {
    res.status(200).json({
      message:
        "La photo de profil n'a pas été mise à jour dans la base de données ! 🥳",
    });
  }
};
