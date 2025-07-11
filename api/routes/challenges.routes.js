import express from 'express';

import { authenticate } from '../middlewares/auth.middleware.js';

import { getAll, getById, getChallengeParticipations, create } from '../controllers/challenges.controller.js';

import { validateUserCreationChallenge } from '../middlewares/challenge.middleware.js';

const router = express.Router();

router.get('/', getAll); // Récupérer tous les challenges
router.get('/:id', getById); // Récupérer un challenge spécifique par son ID
router.get('/:id/participations',  getChallengeParticipations); // Récupérer les participations d'un challenge
router.post('/', authenticate, validateUserCreationChallenge, create); // Authentification TESTÉE & VALIDÉE - Créer un nouveau challenge

export default router;