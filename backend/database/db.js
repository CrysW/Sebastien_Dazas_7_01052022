// IMPORT(S)
require("dotenv").config(); // Importation du package 'dotenv'
const mysql = require("mysql"); // Importation du package 'mysql'

// Paramètres de connexion à la base de données
const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Connexion à la base de données
mysqlConnection.connect(function (err) {
  if (err) {
    console.log(`Erreur de connexion à la base de données: ${err}`);
  } else {
    console.log(`Connecté à la base de données ${process.env.DB_NAME}`);
    console.log(`Connecté en tant qu'identifiant ${mysqlConnection.threadId}`);
  }
});

// EXPORT(S)
module.exports = mysqlConnection; // Exportation de la connexion à la base de données mysql
