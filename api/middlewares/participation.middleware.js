import Joi from "joi";
import { checkBody } from "../utils/common.util.js";

export function validateUserCreationParticipation(req, res, next) {
    const createParticipationSchema = Joi.object({
        media_link: Joi.string().required(),
        description: Joi.string().required(),
        challenge_id: Joi.number().integer().required(),
        user_id: Joi.number().integer().required(),
    });
    checkBody(createParticipationSchema, req.body, res, next);
}

