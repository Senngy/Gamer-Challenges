// participations.routes.js
import express from 'express';
import { addParticipation } from '../controllers/participations.controller.js';
import { validateUserCreationChallenge } from '../middlewares/challenge.middleware.js';
// import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', validateUserCreationChallenge, addParticipation) // Create participations PRIVATE
router.delete('/:id') // delete participations PRIVATE // Ne pas oublier d'implémenter la fonction authenticate 


export default router;