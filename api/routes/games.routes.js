import express from 'express';
import { getAll, getById, getChallengesByGameId, getTopGames } from '../controllers/games.controller.js';

const router = express.Router();

// Route pour récupérer tous les jeux
router.get('/', getAll);

// route pour recuperer le top 3 des jeux via leur participation
router.get('/top', getTopGames);

// Route pour récupérer un jeu par ID
router.get('/:id', getById);

// Route pour récupérer les challenges d'un jeu spécifique
router.get('/:id/challenges', getChallengesByGameId);



export default router;