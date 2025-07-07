// api/controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { User } from '../database/models/user.model.js';



export async function login(req, res) {
    console.log("REQ BODY :", req.body);
    
    const emailFromRequest = req.body.email;
    const passwordFromRequest = req.body.password;

    try {
        const user = await User.findOne({ where: { email: emailFromRequest } });

        if (user) {
            return res.status(StatusCodes.OK).json({ message: "Login réussi", user: { id: user.id, email: user.email } });
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "couple email / mot de passe incorrect" });
        }
    } catch (error) {
        console.error("Erreur dans login:", error); // Ajoute ce log
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "merci de réessayer ultérieurement" });
    }
}

/*
export async function login(req, res) {
    // récupération du username et du mdp 
    const usernameFromRequest = req.body.username;
    const passwordFromRequest = req.body.password;
    // const { usernameFromRequest: username, passwordFromRequest: password } = req.body;

    try {
        // si plus de 3 essais en 5 minutes => authent KO

        // récupérer l'utilisateur avec le bon username
        // let toto = 'une valeur'
        // { toto: toto } => { toto }
        const user = await User.findOne({ where : {username: usernameFromRequest}});

        // SELECT * FROM "user" WHERE username = 'admin' LIMIT 1;
        // Si trouvé
        // cf falsy : https://developer.mozilla.org/en-US/docs/Glossary/Falsy
        if (user)
        {
            //    Si mdp correspond au hash 
            if (scrypt.compare(passwordFromRequest, user.password)) {
                //    => authent ok
                // créer un token jwt
                const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 15 });
                // renvoyer le token à l'utilisateur
                return res.status(StatusCodes.OK).json({token: token});

            } else {
                //    Sinon => authent KO
                return res.status(StatusCodes.BAD_REQUEST).json({error: "couple login / mdp incorrect"});
            }
        } else 
        {
            // Sinon => authent KO
            return res.status(StatusCodes.BAD_REQUEST).json({error: "couple login / mdp incorrect"});
        }

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "merci de réessayer ultérieurement"});
    }
}
    */