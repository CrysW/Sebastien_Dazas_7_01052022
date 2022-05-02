// IMPORT(S)
require("dotenv").config(); // Importation du package 'dotenv'
const express = require("express"); // Importation du package 'express'
const morgan = require("morgan"); // Importation du package 'morgan' (logger htpp)
const mysql = require("./database/db"); // Importation de la connexion à la base de données mysql

// Création de l'application 'express'
const app = express();

// Utilisation de 'morgan' pour logger les "request" et les "responses"
app.use(morgan("dev"));

// EXPORT(S)
module.exports = app; // Exportation de l'application 'express'
