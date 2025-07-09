import { Game } from '../database/models/index.js';
import { StatusCodes } from 'http-status-codes';

// ✅ GET /games - Récupérer tous les jeux
export async function getAll(req, res) {
  try {
    const games = await Game.findAll();

    if (!games || games.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: 'Aucun jeu trouvé',
      });
    }

    return res.status(StatusCodes.OK).json(games);
  } catch (error) {
    console.error('Erreur lors de la récupération des jeux :', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Erreur serveur lors de la récupération des jeux',
    });
  }
}

// ✅ GET /games/:id - Récupérer un jeu par son ID
export async function getById(req, res) {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'ID de jeu invalide' });
  }

  try {
    const game = await Game.findByPk(id);

    if (!game) {
      return res.status(404).json({ error: 'Jeu non trouvé' });
    }

    return res.json(game);
  } catch (error) {
    console.error('Erreur getById:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
