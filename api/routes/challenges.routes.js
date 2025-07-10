import express from 'express';

import { getAll, getById, getChallengeParticipations, create } from '../controllers/challenges.controller.js'; // Import des fonctions du controller
// import { authenticate } from '../middlewares/auth.middleware.js';
import { validateUserCreationChallenge } from '../middlewares/challenge.middleware.js';

const router = express.Router();

router.get('/', getAll); // Récupérer tous les challenges
router.get('/:id', getById); // Récupérer un challenge spécifique par son ID
router.get('/:id/participations',  getChallengeParticipations); // Récupérer les participations d'un challenge
router.post('/', create); // Créer un nouveau challenge // Ne pas oublier d'implémenter la fonction authenticate (route privée)

export default router;