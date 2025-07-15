import Joi from "joi";
import { checkBody } from "../utils/common.util.js";

export function validateUserCreationParticipation(req, res, next) {
    const createParticipationSchema = Joi.object({
        media_link: Joi.string().uri().required(),
        description: Joi.string().required(),
        challenge_id: Joi.number().integer().min(1).required(),
        user_id: Joi.number().integer().min(1).required()
    });
    checkBody(createParticipationSchema, req.body, res, next);
}

