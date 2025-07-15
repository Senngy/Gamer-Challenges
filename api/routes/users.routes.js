// user.routes.js
import express from 'express';

import { getAll, getById } from '../controllers/users.controller.js';

const router = express.Router();

router.get('/', getAll) // All the users
router.get('/:id', getById) // Route for the details of a specific user, possibly add Stats of users ( challenges, participations, likes)

//router.get('/topUsersByLikes')

export default router;