// src/routes/challenges.routes.js
import express from 'express';
import {
  getAll,
  getById,
  create,
  getParticipations
} from '../controllers/challenges.controller.js';

import { Challenge } from '../database/models/challenge.model.js';

const router = express.Router();

// 📥 GET /challenges - Récupérer tous les challenges
router.get('/', getAll);

router.get('/:id', getById) // Details of a challenge

router.get('/:id/participations', getParticipations) // Participations of a challenge

//router.get('/:id/likes',) // Get & See the likes of challenges
//router.post('/:id/likes',) // Give a like to a challenge PRIVATE
//router.patch('/') // If the creator want to edit the challenge ? (pas dans le cahier des charges)

  // Validation optionnelle
  /*const parsedGameId = parseInt(gameId, 10);
  if (isNaN(parsedGameId)) {
    return res.status(400).json({ error: 'gameId invalide' });
  }*/


// 📥 GET /challenges/game/:gameId - ROUTE A SUPPRIMER Récupérer tous les challenges liés à un jeu donné
router.get('/game/:gameId', async (req, res) => {
  const { gameId } = req.params;
  try {
    const challenges = await Challenge.findAll({
      where: { game_by: parsedGameId },
    });

    res.json(challenges);
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des challenges pour le jeu :',
      error
    );
    res.status(500).json({
      error:
        'Erreur serveur lors de la récupération des challenges liés au jeu',
    });
  }
});

// 📥 GET /challenges/:id Récupérer un challenge spécifique par son ID
router.get('/:id', getById);

// 📤 POST /challenges Créer un nouveau challenge
router.post('/', create);

export default router;
