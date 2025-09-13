// Validation des données de connexion côté client
export function validateLoginData(email, password) { // Fonction principale de validation des champs email et mot de passe
    const errors = {}; // Objet qui contiendra les messages d'erreur

    // Validation de l'email
    if (!email) { // Vérifie si l'email est vide ou non défini
        errors.email = "L'email est requis"; // Message d'erreur si l'email est vide
    } else if (!isValidEmail(email)) { // Vérifie si l'email n'est pas au bon format
        errors.email = "L'adresse email n'est pas valide"; // Message si l'email est invalide
    } else if (email.length > 255) { // Vérifie que l'email ne dépasse pas 255 caractères
        errors.email = "L'email ne peut pas dépasser 255 caractères"; // Message si trop long
    }

    // Validation du mot de passe
    if (!password) { // Vérifie si le mot de passe est vide ou non défini
        errors.password = "Le mot de passe est requis"; // Message d'erreur si vide
    }

    return {
        isValid: Object.keys(errors).length === 0, // Renvoie true si aucune erreur, false sinon
        errors // Renvoie l'objet contenant les messages d'erreur
    };
}

// Fonction utilitaire pour valider l'email
function isValidEmail(email) { // Fonction qui vérifie si l'email correspond au format standard
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour un email basique
    return emailRegex.test(email); // Teste l'email avec la regex et renvoie true ou false
}

// Fonction pour nettoyer les données avant envoi
export function sanitizeLoginData(email, password) { // Prépare les données du formulaire avant envoi
    return {
        email: email?.trim().toLowerCase(), // Supprime les espaces et met l'email en minuscules
        password: password // Ne pas modifier le mot de passe (conservé tel quel)
    };
}