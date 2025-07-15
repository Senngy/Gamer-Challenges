// participations.routes.js
import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { addParticipation, getLikes, addLike, checkIfLiked, deleteLike } from '../controllers/participations.controller.js';
import { validateUserCreationParticipation } from '../middlewares/participation.middleware.js';


const router = express.Router();

router.post('/', authenticate, validateUserCreationParticipation, addParticipation) // Authentification TESTÉE & VALIDÉE - Créer un nouveau challenge
router.get('/:id/likes', getLikes);                 // Récupérer la liste ou le nombre de likes (public)
router.post('/:id/likes', authenticate, addLike);   // Ajouter un like (auth obligatoire)
router.delete('/:id/likes', authenticate, deleteLike); // Supprimer un like (auth obligatoire)
router.get('/:id/likes/status', authenticate, checkIfLiked); // Vérifier si user a liké (auth obligatoire)
export default router;