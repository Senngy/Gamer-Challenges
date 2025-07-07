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

export async function register(req, res) {
    console.log("REQ BODY :", req.body);
    // récupération du email et du mdp 
    // et du nom du role
    const { email, pseudo, password, birth_date, first_name, last_name } = req.body;
    try {
       // const hashedPassword = scrypt.hash(password);
        

        //création du user en BDD
        const user = await User.create({
            pseudo, 
            email,
            password,
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


/*
export async function login(req, res) {
    // récupération du email et du mdp 
    const emailFromRequest = req.body.email;
    const passwordFromRequest = req.body.password;
    // const { emailFromRequest: email, passwordFromRequest: password } = req.body;

    try {
        // si plus de 3 essais en 5 minutes => authent KO

        // récupérer l'utilisateur avec le bon email
        // let toto = 'une valeur'
        // { toto: toto } => { toto }
        const user = await User.findOne({ where : {email: emailFromRequest}});

        // SELECT * FROM "user" WHERE email = 'admin' LIMIT 1;
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