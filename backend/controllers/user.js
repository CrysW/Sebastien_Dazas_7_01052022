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

// MODIFIER LES DONNEES DE L'UTILISATEUR : Middleware pour modifier les données de l'utilisateur
exports.updateUserData = function (req, res, next) {
  // Requête SQL pour récupérer des données de l'utilisateur dans la base de données
  mysqlConnection.query(
    `SELECT * FROM users WHERE idUser="${req.body.idUser}"`,
    function (error, results, fields) {
      if (error) {
        res
          .status(400)
          .json({ message: "Une erreur est survenue ! 😅", error });
      } else {
        // Création d'un objet 'dataDatabase' contenant les données de l'utilisateur provenant de la base de données
        const dataDatabase = {
          lastName: results[0].lastName,
          firstName: results[0].firstName,
          emailAdress: results[0].emailAdress,
          password: results[0].password,
        };
        // Création d'un objet 'dataRequest' contenant les données de l'utilisateur provenant du body de la requête
        const dataRequest = {
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          emailAdress: req.body.emailAdress,
          password: req.body.password,
        };
        // Comparaison des données des 2 objets
        if (
          dataDatabase.lastName === dataRequest.lastName &&
          dataDatabase.firstName === dataRequest.firstName &&
          dataDatabase.emailAdress === dataRequest.emailAdress &&
          dataDatabase.password === dataRequest.password
        ) {
          res.status(200).json({
            message: "Aucunes données n'a besoin d'être mises à jour ! 🥳",
          });
        } else if (dataDatabase.lastName !== dataRequest.lastName) {
          // MISE A JOUR DU LAST NAME
          // Requête SQL pour mettre à jour le 'lastName' dans la base de données
          mysqlConnection.query(
            `UPDATE users SET lastName = "${dataRequest.lastName}" WHERE users.idUser = "${req.body.idUser}"`,
            function (error, results, fields) {
              if (error) {
                res
                  .status(400)
                  .json({ message: "Une erreur est survenue ! 😅", error });
              } else {
                res.status(200).json({
                  message:
                    "Le nom a été mise à jour dans la base de données ! 🥳",
                });
              }
            }
          );
        } else if (dataDatabase.firstName !== dataRequest.firstName) {
          // MISE A JOUR DU FIRST NAME
          // Requête SQL pour mettre à jour le 'firstName' dans la base de données
          mysqlConnection.query(
            `UPDATE users SET firstName = "${dataRequest.firstName}" WHERE users.idUser = "${req.body.idUser}"`,
            function (error, results, fields) {
              if (error) {
                res
                  .status(400)
                  .json({ message: "Une erreur est survenue ! 😅", error });
              } else {
                res.status(200).json({
                  message:
                    "Le prénom a été mise à jour dans la base de données ! 🥳",
                });
              }
            }
          );
        } else if (dataDatabase.emailAdress !== dataRequest.emailAdress) {
          // MISE A JOUR DE L'ADRESSE EMAIL
          // Requête SQL pour mettre à jour 'emailAdress' dans la base de données
          mysqlConnection.query(
            `UPDATE users SET emailAdress = "${dataRequest.emailAdress}" WHERE users.idUser = "${req.body.idUser}"`,
            function (error, results, fields) {
              if (error) {
                res
                  .status(400)
                  .json({ message: "Une erreur est survenue ! 😅", error });
              } else {
                res.status(200).json({
                  message:
                    "L'adresse' a été mise à jour dans la base de données ! 🥳",
                });
              }
            }
          );
        } else if (dataDatabase.password !== dataRequest.password) {
          // MISE A JOUR DU PASSWORD
          // Hashage du nouveau mot de passe
          bcrypt
            .hash(dataRequest.password, 10)
            .then(function (hash) {
              // Mot de passe hashé
              const hashedPassword = hash;
              // Requête SQL pour mettre à jour le 'password' dans la base de données
              mysqlConnection.query(
                `UPDATE users SET password = "${hashedPassword}" WHERE users.idUser = "${req.body.idUser}"`,
                function (error, results, fields) {
                  if (error) {
                    res
                      .status(400)
                      .json({ message: "Une erreur est survenue ! 😅", error });
                  } else {
                    res.status(200).json({
                      message:
                        "Le mot de passe a été mise à jour dans la base de données ! 🥳",
                    });
                  }
                }
              );
            })
            .catch(function (error) {
              res.status(500).json({ error: error });
            });
        }
      }
    }
  );
};

// SUPPRIMER : Middleware pour supprimer le compte de l'utilisateur
exports.deleteAccount = function (req, res, next) {
  // Requête SQL pour récupérer les données de la publication dans la base de données
  mysqlConnection.query(
    `SELECT * FROM publications WHERE idUser = "${req.params.id}" `,
    function (error, results, fields) {
      if (error) {
        res
          .status(400)
          .json({ message: "Une erreur est survenue ! 😅", error });
      } else {
        // Récupération de(s) l'image(s) de(s) la publication(s) à supprimer dans le dossier 'images' du serveur
        let dataPictureTodelete = [];
        for (let i = 0; i < results.length; i = i + 1) {
          if (results[i].publicationPicture !== null) {
            dataPictureTodelete.push(
              results[i].publicationPicture.split("images/")[1]
            );
          }
        }
        // Suppression de(s) l'image(s) de la publication(s) dans le dossier 'images' du serveur
        for (let i = 0; i < dataPictureTodelete.length; i = i + 1) {
          fs.removeSync(`images/${dataPictureTodelete[i]}`);
        }
        // Requête SQL pour récupérer les données de l'utilisateur dans la base de données
        mysqlConnection.query(
          `SELECT * FROM users WHERE idUser = "${req.params.id}"`,
          function (error, results, fields) {
            if (error) {
              res
                .status(400)
                .json({ message: "Une erreur est survenue ! 😅", error });
            } else {
              // Récupération de l'image de profile à supprimer dans le dossier 'images' du serveur
              const pictureProfileToDelete =
                results[0].profilePicture.split("images/")[1];
              // Suppression de l'image de profile dans le dossier 'images' du serveur
              fs.removeSync(`images/${pictureProfileToDelete}`);
              // Requête SQL pour supprimer tous les commentaires dans la base de données
              mysqlConnection.query(
                `DELETE FROM comments WHERE idUser = ${req.params.id};`,
                function (error, results, fields) {
                  if (error) {
                    res
                      .status(400)
                      .json({ message: "Une erreur est survenue ! 😅", error });
                  } else {
                    // Requête SQL pour supprimer toutes les publications dans la base de données
                    mysqlConnection.query(
                      `DELETE FROM publications WHERE idUser = ${req.params.id};`,
                      function (error, results, fields) {
                        if (error) {
                          res.status(400).json({
                            message: "Une erreur est survenue ! 😅",
                            error,
                          });
                        } else {
                          // Requête SQL pour supprimer le compte utilisateur dans la base de données
                          mysqlConnection.query(
                            `DELETE FROM users WHERE idUser = ${req.params.id};`,
                            function (error, results, fields) {
                              if (error) {
                                res.status(400).json({
                                  message: "Une erreur est survenue ! 😅",
                                  error,
                                });
                              } else {
                                res.status(200).json({
                                  message: "Votre compte a été supprimé ! 😭",
                                });
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};
