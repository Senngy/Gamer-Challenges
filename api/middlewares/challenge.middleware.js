import Joi from "joi";
import { checkBody } from "../utils/common.util.js";

export function validateUserCreationChallenge(req, res, next) {
    const createChallengeSchema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        rules: Joi.string().required(),
    });
    checkBody(createChallengeSchema, req.body, res, next);
}

