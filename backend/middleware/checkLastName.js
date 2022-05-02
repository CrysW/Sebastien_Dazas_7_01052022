// EXPORT(S)

// VERIFICATION DU NOM : Middleware de vérification de la qualité du nom
module.exports = function (req, res, next) {
  // Création de l'expression régulière pour la validation du nom
  const lastNameRegExp = new RegExp(
    "^[A-Z]{1}[a-zàâäéèêëïîôöùûüÿç-]{1,14}$",
    "g"
  );
  // Test de la longueur du nom et de l'expression régulière
  const lastNameTest = lastNameRegExp.test(req.body.lastName);
  const lastNameLength = req.body.lastName;
  if (
    lastNameLength.length < 2 ||
    lastNameLength.length >= 16 ||
    lastNameTest === false
  ) {
    return res.status(400).json({
      message:
        "Le nom doit contenir entre 2 et 15 caractères (pas de caractères spéciaux, pas chiffres) ! 😅",
    });
  } else {
    next();
  }
};
