// src/routes/games.routes.js

import express from 'express';
import { Game } from '../database/models/game.model.js';
import { Challenge } from '../database/models/challenge.model.js';

const router = express.Router();

// ✅ Route pour récupérer tous les jeux
router.get('/', async (req, res) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (error) {
    console.error('Erreur lors de la récupération des jeux :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ Route pour récupérer un jeu par ID
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) {
      return res.status(404).json({ error: 'Jeu non trouvé' });
    }
    res.json(game);
  } catch (error) {
    console.error('Erreur lors de la récupération du jeu :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});
//router.get('/:id', getGameById, ) // Details of a game
//router.get('/:id', challengesByGameId) // Details of a game 
// OU
//router.get('/:id', getGameById, challengesByGameId) // Details of a game 

// ✅ (Optionnel) Route pour récupérer les challenges d’un jeu spécifique
router.get('/:id/challenges', async (req, res) => {
  try {
    const challenges = await Challenge.findAll({
      where: { game_by: req.params.id },
    });
    res.json(challenges);
  } catch (error) {
    console.error('Erreur lors de la récupération des challenges :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
