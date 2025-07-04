// challenges.routes.js
import express from 'express';

import { getAll, getById } from '../controllers/challenges.controller.js';

const router = express.Router();

router.get('/', getAll) // All of the challenges 
//router.post('/',) // Create a challenge
router.get('/:id', getById) // Details of a challenge
//router.get('/:id/likes',) // Get & See the likes of challenges
//router.post('/:id/likes',) // Give a like to a challenge PRIVATE
// router.patch('/') // If the creator want to edit the challenge ? (pas dans le cahier des charges)

export default router;