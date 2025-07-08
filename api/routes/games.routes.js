// games.routes.js
import { Game } from '../database/models/game.model.js';
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  const games = await Game.findAll();
  res.json(games);
});

router.get('/:id', async (req, res) => {
  const game = await Game.findByPk(req.params.id);
  if (!game) {
    return res.status(404).json({ error: 'Jeu non trouvé' });
  }
  res.json(game);
});

export default router;
