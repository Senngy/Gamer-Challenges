import Joi from "joi";
import { checkBody } from "../utils/common.util.js";

export function validateUserCreationChallenge(req, res, next) {
    const createPartcipationSchema = Joi.object({
        media_link: Joi.string().required(),
        description: Joi.string().required(),
    });
    checkBody(createPartcipationSchema, req.body, res, next);
}

