// Validation d'email robuste avec regex complète.
export function validateEmail(email) {
  if (!email) return "L'email est requis"; // Vérifie que l'email est renseigné
  const emailRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/; // Regex RFC 5322 simplifiée pour valider le format de l'email
  if (!emailRegex.test(email)) {
    return "Format d'email invalide"; // Vérifie si le format de l'email est invalide
  }
  if (email.length > 255) {
    return "L'email ne peut pas dépasser 255 caractères"; // Vérifie que la longueur ne dépasse pas 255 caractères
  }
  return null; // Si tout est bon, retourne null (aucune erreur)
}

// Validation de pseudo sécurisée
export function validatePseudo(pseudo) {
  if (!pseudo) return "Le pseudo est requis"; // Vérifie que le pseudo est renseigné
  if (pseudo.length < 3) {
    return "Le pseudo doit contenir au moins 3 caractères"; // Vérifie que le pseudo contient au moins 3 caractères
  }
  if (pseudo.length > 30) {
    return "Le pseudo ne peut pas dépasser 30 caractères"; // Vérifie que le pseudo ne dépasse pas 30 caractères
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(pseudo)) {
    return "Le pseudo ne peut contenir que des lettres, chiffres, tirets et underscores"; // Vérifie les caractères autorisés
  }
  return null; // Si tout est bon, retourne null
}

// Validation de mot de passe avec critères de sécurité avancés.
export function validatePassword(password) {
  const errors = []; // Initialise un tableau pour stocker les erreurs
  if (!password) return ["Le mot de passe est requis"]; // Vérifie que le mot de passe est renseigné
  if (password.length < 8) errors.push("Le mot de passe doit à supérieur 8 caractères"); // Vérifie la longueur minimale
  if (!/[a-z]/.test(password)) errors.push("Le mot de passe doit contenir au moins une minuscule"); // Vérifie la présence d'une minuscule
  if (!/[A-Z]/.test(password)) errors.push("Le mot de passe doit contenir au moins une majuscule"); // Vérifie la présence d'une majuscule
  if (!/\d/.test(password)) errors.push("Le mot de passe doit contenir au moins un chiffre"); // Vérifie la présence d'un chiffre
  if (!/[@$!%*?&]/.test(password)) errors.push("Le mot de passe doit contenir au moins un caractère spécial"); // Vérifie la présence d’un caractère spécial
  return errors; // Retourne la liste des erreurs (vide si tout est bon)
}

// Validation complète du formulaire d'inscription.
export function validateRegistrationForm(formData) {
  const errors = {}; // Initialise un objet pour stocker les erreurs
  const emailError = validateEmail(formData.email); // Valide l'email
  if (emailError) errors.email = emailError; // Si erreur email, l’ajoute
  const pseudoError = validatePseudo(formData.pseudo); // Valide le pseudo
  if (pseudoError) errors.pseudo = pseudoError; // Si erreur pseudo, l’ajoute
  const passwordErrors = validatePassword(formData.password); // Valide le mot de passe
  if (passwordErrors.length > 0) errors.password = passwordErrors.join(', '); // Si erreurs, on les ajoute sous forme de chaîne
  return { isValid: Object.keys(errors).length === 0, errors }; // Retourne si le formulaire est valide, et les erreurs trouvées
}