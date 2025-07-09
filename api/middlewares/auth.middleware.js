import Joi from "joi";
import { checkBody } from "../utils/common.util.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
// import { User } from "../database/models/user.model.js";


export function validateUserCreation(req, res, next) {
    const createUserSchema = Joi.object({
        pseudo: Joi.string().required(),
        password: Joi.string().min(8).required(),
        email: Joi.string().required(),
        birth_date: Joi.date().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
    });
    checkBody(createUserSchema, req.body, res, next);
}

export function authenticate(req, res, next){ 
    const authHeader = req.headers.authorization;
    
    // Si le header n'existe pas
    // OU Si la valeur ne commence pas par Bearer
    // Alors non connecté
    if (! authHeader || ! authHeader.startsWith('Bearer '))
    {
        return res.status(StatusCodes.UNAUTHORIZED).json({error: "authenticate : missing token"})
    }
    const token = authHeader.split(' ')[1];
    console.log(token);

    try {
        const dataDecoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(dataDecoded);
        req.user_id = dataDecoded.user_id;

        next();
    }
    catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({error: 'authenticate : Token invalid or expired'});

    }
    // token n'existe pas et est valide et contient un id connu
    // Alors appeler le prochain middleware
    // Sinon refusé l'accès
}

export function validateUserUpdatePseudo(req, res, next) {
    const updateUserSchema = Joi.object({
        newPseudo: Joi.string().required(),
    });
    checkBody(updateUserSchema, req.body, res, next);
}
export function validateUserUpdatePassword(req, res, next) {
  const updateUserSchema = Joi.object({
    currentPassword: Joi.string()
      .min(8)
      .required()
      .messages({
        'any.required': 'Le mot de passe actuel est requis',
        'string.min': 'Le mot de passe actuel doit contenir au moins 8 caractères',
      }),

    newPassword: Joi.string()
      .min(8)
      .disallow(Joi.ref('currentPassword')) // ne doit pas être identique
      .required()
      .messages({
        'any.required': 'Le nouveau mot de passe est requis',
        'string.min': 'Le nouveau mot de passe doit contenir au moins 8 caractères',
        'any.invalid': 'Le nouveau mot de passe doit être différent de l\'ancien',
      }),
  });

  checkBody(updateUserSchema, req.body, res, next);
}