// user.routes.js
import express from 'express';

import { getAll, getById, getTopUsersByChallengeLikes, getTopUsersByParticipationLikes } from '../controllers/users.controller.js';

const router = express.Router();

router.get('/', getAll) // All the users
router.get('/topUsersByChallengeLikes', getTopUsersByChallengeLikes)
router.get('/topUsersByParticipationLikes', getTopUsersByParticipationLikes)
router.get('/:id', getById) // Route for the details of a specific user, possibly add Stats of users ( challenges, participations, likes)



export default router;