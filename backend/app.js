// IMPORT(S)
require("dotenv").config(); // Importation du package 'dotenv'
const express = require("express"); // Importation du package 'express'
const morgan = require("morgan"); // Importation du package 'morgan' (logger htpp)
const mysql = require("./database/db"); // Importation de la connexion à la base de données mysql
const userRoutes = require("./routes/user"); // Importation du 'router' pour le parcours des utilisateurs
const publicationRoutes = require("./routes/publication"); // Importation du 'router' pour le parcours des publications
const commentRoutes = require("./routes/comment"); // Importation du 'router' pour le parcours des commentaires

// Création de l'application 'express'
const app = express();

// Utilisation de 'morgan' pour logger les "request" et les "responses"
app.use(morgan("dev"));

// Gestion des requêtes 'POST' : Middleware qui permet d'accédé aux corps de la requête
app.use(express.json());

// Levée de la sécurité CORS (Cross Origin Request Sharing)
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Enregistrement du 'router' pour toutes les demandes effectuées
app.use("/api/users", userRoutes);
app.use("/api/publications", publicationRoutes);
app.use("/api/comments", commentRoutes);

// EXPORT(S)
module.exports = app; // Exportation de l'application 'express'
