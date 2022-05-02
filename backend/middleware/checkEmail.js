// IMPORT(S)
const validator = require("validator"); // Importation du package 'validator'

// EXPORT(S)

// VERIFICATION DE L'ADRESSE MAIL : Middleware de vérification de l'adresse mail
module.exports = function (req, res, next) {
  // Si l'adresse mail n'est pas valide ou si l'adresse mail est vide
  if (
    !validator.isEmail(req.body.emailAdress) ||
    validator.isEmpty(req.body.emailAdress)
  ) {
    return res
      .status(400)
      .json({ message: "Veuillez saisir une adresse mail valide ! 😅" });
  } else {
    next();
  }
};
