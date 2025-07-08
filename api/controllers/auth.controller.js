// api/controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
// import { User } from '../database/models/user.model.js';
// import { Challenge } from '../database/models/challenge.model.js';
import { User, Challenge } from '../database/models/index.js'; // Assurez-vous que cette importation est correcte
import { scrypt } from '../utils/scrypt.js'; // Assurez-vous que cette importation est correcte

export async function login(req, res) { // Fonction pour gérer la connexion des utilisateurs
    console.log("REQ BODY :", req.body);
    
    const emailFromRequest = req.body.email;
    const passwordFromRequest = req.body.password;
    console.log("emailFromRequest :", emailFromRequest);
    console.log("passwordFromRequest :", passwordFromRequest);

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
                    user: { id: user.id, email: user.email, pseudo: user.pseudo } // Envoi des informations de l'utilisateur   
                });
            } else { // Si le mot de passe ne correspond pas echec authentification
                return res.status(StatusCodes.BAD_REQUEST).json({ error: "email et/ou mot de passe incorrect" });   
            }
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "email et/ou mot de passe incorrect" }); // Si l'utilisateur n'existe pas
        }    
    } catch (error) {
        console.error("Erreur dans login auth api:", error); // Ajoute ce log
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "merci de réessayer ultérieurement" });
    }
}

export async function register(req, res) { // Fonction pour gérer l'inscription des utilisateurs
    console.log("REQ BODY :", req.body);
    // récupération du email et du mdp 
    // et du nom du role
    const { email, pseudo, password, birth_date, first_name, last_name } = req.body;
    try {
        const hashedPassword = scrypt.hash(password); // Hash du mot de passe
        

        //création du user en BDD
        const user = await User.create({
            pseudo, 
            email,
            password: hashedPassword, // Utilisation du mot de passe haché
            birth_date,
            first_name,
            last_name,
        });
        // on renvoit les infos au client
        return res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {

            let errorMsg = 'Duplicate entry';
            if (error.errors.length > 0) {
                errorMsg = error.errors[0].message;
            }
            return res.status(StatusCodes.CONFLICT).json({ 
                error: errorMsg
            });
        }
        console.log(error);
        throw new Error("Internal Server Error !");
    }
}

export async function me (req, res) {
    try {
        console.log("req.user_id:", req.user_id);

        const user = await User.findByPk(req.user_id, { 
            attributes : ["id", "pseudo", "email"],
            include: { model: Challenge, as: "challenge_created", attributes: ['id', 'title']}
        })
        // obtenir les infos du user connecté
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({error: "Utilisateur non trouvé"})
        }
        
        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        console.error("Erreur dans me auth api:", error); // Ajoute ce log
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erreur interne"})
    }
}