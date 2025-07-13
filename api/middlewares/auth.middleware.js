import Joi from "joi";
import { checkBody } from "../utils/common.util.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { parse, isValid } from 'date-fns';

export function validateUserCreation(req, res, next) {
    const createUserSchema = Joi.object({
        pseudo: Joi.string()
            .min(3)
            .max(30)
            .pattern(/^[a-zA-Z0-9_-]+$/)
            .required()
            .messages({
                'string.min': 'Le pseudo doit contenir au moins 3 caractères',
                'string.max': 'Le pseudo ne peut pas dépasser 30 caractères',
                'string.pattern.base': 'Le pseudo ne peut contenir que des lettres, chiffres, tirets et underscores',
                'any.required': 'Le pseudo est requis'
            }),
        password: Joi.string()
            .min(8)
            .max(128)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
            .required()
            .messages({
                'string.min': 'Le mot de passe doit contenir au moins 8 caractères',
                'string.max': 'Le mot de passe ne peut pas dépasser 128 caractères',
                'string.pattern.base': 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)',
                'any.required': 'Le mot de passe est requis'
            }),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .max(255)
            .required()
            .messages({
                'string.email': 'L\'adresse email n\'est pas valide',
                'string.max': 'L\'email ne peut pas dépasser 255 caractères',
                'any.required': 'L\'email est requis'
            }),
        birth_date: Joi.string()
    .required()
    .custom((value, helpers) => {
      const parsed = parse(value, 'dd/MM/yyyy', new Date());
      if (!isValid(parsed)) {
        return helpers.error('any.invalid');
      }
      return parsed; // on retourne un Date
    })
    .messages({
      'any.invalid': 'La date doit être au format JJ/MM/AAAA valide',
    }),
        first_name: Joi.string()
            .min(2)
            .max(50)
            .pattern(/^[a-zA-ZÀ-ÿ\s\-']+$/)
            .required(),
        last_name: Joi.string()
            .min(2)
            .max(50)
            .pattern(/^[a-zA-ZÀ-ÿ\s\-']+$/)
            .required()
    });
    checkBody(createUserSchema, req.body, res, next);
}

export function validateUserLogin(req, res, next) {
    const loginUserSchema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .max(255)
            .required()
            .messages({
                'string.email': 'L\'adresse email n\'est pas valide',
                'string.max': 'L\'email ne peut pas dépasser 255 caractères',
                'any.required': 'L\'email est requis'
            }),
        password: Joi.string()
            .min(1)
            .required()
            .messages({
                'string.min': 'Le mot de passe est requis',
                'any.required': 'Le mot de passe est requis'
            })
    });
    
    checkBody(loginUserSchema, req.body, res, next);
}

export function authenticate(req, res, next){ 
    const authHeader = req.headers.authorization;
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
