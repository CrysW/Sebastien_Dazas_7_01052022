// EXPORT(S)

// VERIFICATION DU PRENOM : Middleware de vérification de la qualité du prénom
module.exports = function (req, res, next) {
  // Création de l'expression régulière pour la validation du prénom
  const firstNameRegExp = new RegExp(
    "^[A-Z]{1}[a-zàâäéèêëïîôöùûüÿç-]{1,14}$",
    "g"
  );
  // Test de la longueur du prénom et de l'expression régulière
  const firstNameTest = firstNameRegExp.test(req.body.firstName);
  const firstNameLength = req.body.firstName;
  if (
    firstNameLength.length < 2 ||
    firstNameLength.length >= 16 ||
    firstNameTest === false
  ) {
    return res.status(400).json({
      message:
        "Le prénom doit contenir entre 2 et 15 caractères (pas de caractères spéciaux, pas chiffres) ! 😅",
    });
  } else {
    next();
  }
};
