import express from 'express';

import { authenticate } from '../middlewares/auth.middleware.js';

import { getAll, getById, getChallengeParticipations, create, getLikes, addLike, deleteLike, checkIfLiked } from '../controllers/challenges.controller.js'; // Import des fonctions du controller


import { validateUserCreationChallenge } from '../middlewares/challenge.middleware.js';

const router = express.Router();

router.get('/', getAll); // Récupérer tous les challenges

//

router.get('/:id/likes', getLikes);                 // Récupérer la liste ou le nombre de likes (public)
router.post('/:id/likes', authenticate, addLike);   // Ajouter un like dans la table Like et dans la table Challenge (auth obligatoire)
router.delete('/:id/likes', authenticate, deleteLike); // Supprimer un like dans la table Like et dans la table Challenge (auth obligatoire)
router.get('/:id/likes/status', authenticate, checkIfLiked); // Vérifier si user a liké (auth obligatoire)


//

router.get('/:id', getById); // Récupérer un challenge spécifique par son ID
router.get('/:id/participations',  getChallengeParticipations); // Récupérer les participations d'un challenge
router.post('/', authenticate, validateUserCreationChallenge, create); // Authentification TESTÉE & VALIDÉE - Créer un nouveau challenge

export default router;