// games.routes.js
import { Game } from '../database/models/game.model.js';
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  const games = await Game.findAll();
  res.json(games);
});

export default router;
