import express from 'express';
import { getAll, getById, getChallengesByGameId, getTopGames, getRandomGames, searchGames } from '../controllers/games.controller.js';


const router = express.Router();
// Route pour récupérer tous les jeux
router.get('/', getAll);

// Route pour rechercher des jeux par nom
router.get('/search', searchGames);

router.get('/top', getTopGames);

router.get('/random', getRandomGames);

// router.get('/top3', getTop3);


// Route pour récupérer un jeu par ID
router.get('/:id', getById);

// Route pour récupérer les challenges d'un jeu spécifique
router.get('/:id/challenges', getChallengesByGameId);

export default router;