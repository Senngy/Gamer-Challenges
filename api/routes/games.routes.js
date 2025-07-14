import express from 'express';
import { getAll, getTop3, getById, getChallengesByGameId } from '../controllers/games.controller.js';

const router = express.Router();

// Route pour récupérer tous les jeux
router.get('/', getAll);

// Route pour récupérer le TOP 3 des jeux
router.get('/top3', getTop3);

// Route pour récupérer un jeu par ID
router.get('/:id', getById);

// Route pour récupérer les challenges d'un jeu spécifique
router.get('/:id/challenges', getChallengesByGameId);

export default router;