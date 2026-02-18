import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
// import { User } from '../database/models/user.model.js';
// import { Challenge } from '../database/models/challenge.model.js';
import { User, Challenge } from '../database/models/index.js'; // Assurez-vous que cette importation est correcte
import { scrypt } from '../utils/scrypt.js'; // Assurez-vous que cette importation est correcte
import { parse, isValid } from 'date-fns'; // très important
import { fr } from 'date-fns/locale';      // si besoin, sinon le parsing fonctionne sans




export async function login(req, res) { // Fonction pour gérer la connexion des utilisateurs
    console.log("Body reçu par Joi:", req.body);

    const emailFromRequest = req.body.email;
    const passwordFromRequest = req.body.password;
    try {
        const user = await User.findOne({ where: { email: emailFromRequest } }); // Récupération de l'utilisateur par email
        if (user) {
            // Vérification du mot de passe
            if (scrypt.compare(passwordFromRequest, user.password)) { // Si le mot de passe correspond
                // Création du token JWT             
                const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h'  });
                // Renvoi du token et des informations de l'utilisateur
                return res.status(StatusCodes.OK).json({
                    message: "check token : Login réussi",
                    token: token, // Envoi du token
                    user: { id: user.id, email: user.email, pseudo: user.pseudo }  
                });
            } else { // Si le mot de passe ne correspond pas echec authentification
                return res.status(StatusCodes.BAD_REQUEST).json({ error: "email et/ou mot de passe incorrect" });   
            }
        } else { // Si l'utilisateur n'existe pas
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "email et/ou mot de passe incorrect" }); 
        }    
    } catch (error) {
        console.error("Erreur dans login auth api:", error); // Ajoute ce log
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "merci de réessayer ultérieurement" });
    }
}

export async function register(req, res) {
  console.log("REQ BODY :", req.body);

  const { email, pseudo, password, birth_date, first_name, last_name } = req.body;

  try {
    const hashedPassword = scrypt.hash(password); // Hash du mot de passe

    // Étape 1 – parser la date reçue en format 'dd/MM/yyyy'
    const parsedDate = parse(birth_date, 'dd/MM/yyyy', new Date());

    // Étape 2 – vérifier que la date est valide
    if (!isValid(parsedDate)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "La date de naissance est invalide. Format attendu : JJ/MM/AAAA"
      });
    }

    // Étape 3 – création du user avec la date correctement parsée
    const user = await User.create({ pseudo, email, password: hashedPassword, birth_date: parsedDate, first_name, last_name });

    // Étape 4 – retour de la réponse au client
    return res.status(StatusCodes.CREATED).json(user);

  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      let errorMsg = 'Duplicate entry';
      if (error.errors.length > 0) {
        errorMsg = error.errors[0].message;
      }
      return res.status(StatusCodes.CONFLICT).json({ error: errorMsg });
    }

    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Erreur interne du serveur."
    });
  }
}

export async function me (req, res) {
    try {
        console.log("req.user_id:", req.user_id);

        const user = await User.findByPk(req.user_id, { 
            attributes : ["id", "pseudo", "email", "avatar"],
            include: { model: Challenge, as: "challenge_created", attributes: ['id', 'title']}
        })
        // obtenir les infos du user connecté
        console.log('user me', user)
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({error: "Utilisateur non trouvé"})
        }
        
        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        console.error("Erreur dans me auth api:", error); // Ajoute ce log
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erreur interne"})
    }
}

export async function logout (req, res) {
    // La suppression du token localStorage doit être faite côté client
    try {
        return res.status(StatusCodes.OK).json({ 
            message: "Déconnexion réussie" 
        });
    } catch (error) {
        console.error("Erreur dans logout auth api:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            error: "Erreur lors de la déconnexion" 
        });
    }
}

export async function deleteAccount(req, res) {
    try {
        const userId = req.user_id; // Récupération de l'ID de l'utilisateur à partir du token JWT
        console.log("userId:", userId);

        // Suppression de l'utilisateur de la base de données
        const deletedUser = await User.destroy({ where: { id: userId } });

        if (deletedUser) {
            return res.status(StatusCodes.OK).json({ message: "Compte supprimé avec succès" });
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.error("Erreur dans deleteAccount auth api:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur lors de la suppression du compte" });
    }
}

export async function modifyPassword(req, res) {
    console.log("REQ BODY :", req.body);
    console.log("REQ USER ID :", req.user_id);
    console.log("currentPassword:", req.body.currentPassword);
    console.log("newPassword:", req.body.newPassword);
    try {
        const userId = req.user_id; // Récupération de l'ID de l'utilisateur à partir du token JWT
        const { currentPassword, newPassword } = req.body; // Récupération des mots de passe depuis le corps de la requête

        // Récupération de l'utilisateur par ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Utilisateur non trouvé" });
        }

        // Vérification du mot de passe actuel
        const isMatch = await scrypt.compare(currentPassword, user.password); // Comparaison du mot de passe actuel avec le mot de passe haché stocké
        if (!isMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Mot de passe actuel incorrect" });
        }

        // Mise à jour du mot de passe
        // Si le mot de passe correspond
        const newHashedPassword = await scrypt.hash(newPassword);
        user.password = newHashedPassword; // Hachage du nouveau mot de passe
        await user.save(); // Sauvegarde de l'utilisateur avec le nouveau mot de passe
        

        return res.status(StatusCodes.OK).json({ message: "Mot de passe modifié avec succès" });
    } catch (error) {
        console.error("Erreur dans modifyPassword auth api:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur lors de la modification du mot de passe" });
    }
}

export async function modifyPseudo(req, res) {
    console.log("REQ BODY :", req.body);
    const userId = req.user_id; // Récupération de l'ID de l'utilisateur à partir du token JWT
    const { newPseudo } = req.body; // Récupération du nouveau pseudo depuis le corps de la requête
    console.log("userId:", userId);
    console.log("newPseudo:", newPseudo);

    try {
        // Récupération de l'utilisateur par ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Utilisateur non trouvé" });
        }

        // Mise à jour du pseudo
        user.pseudo = newPseudo;
        await user.save();

        return res.status(StatusCodes.OK).json({ message: "Pseudo modifié avec succès" });
    } catch (error) {
        console.error("Erreur dans modifyPseudo auth api:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur lors de la modification du pseudo" });
    }
}