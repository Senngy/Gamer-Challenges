import { Game } from '../database/models/index.js';
import { Challenge } from '../database/models/index.js';
import { StatusCodes } from 'http-status-codes';
import { Op, Sequelize } from 'sequelize';

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
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      error: 'ID de jeu invalide' 
    });
  }

  try {
    const game = await Game.findByPk(id);

    if (!game) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        error: 'Jeu non trouvé' 
      });
    }

    return res.status(StatusCodes.OK).json(game);
  } catch (error) {
    console.error('Erreur lors de la récupération du jeu :', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      error: 'Erreur serveur lors de la récupération du jeu' 
    });
  }
}

// ✅ GET /games/:id/challenges - Récupérer les challenges d'un jeu spécifique
export async function getChallengesByGameId(req, res) {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      error: 'ID de jeu invalide' 
    });
  }

  try {
    // Vérifier d'abord que le jeu existe
    const game = await Game.findByPk(id);
    if (!game) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        error: 'Jeu non trouvé' 
      });
    }

    const challenges = await Challenge.findAll({
      where: { game_by: id },
    });

    return res.status(StatusCodes.OK).json(challenges);
  } catch (error) {
    console.error('Erreur lors de la récupération des challenges :', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      error: 'Erreur serveur lors de la récupération des challenges' 
    });
  }
}

// ✅ GET /games/search - Rechercher des jeux par nom
export async function searchGames(req, res) {
  const { query } = req.query;
  console.log("GamesController QUERY :", query)

  if (!query || typeof query !== 'string' || query.trim() === '') {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      error: 'Requête de recherche invalide' 
    });
  }

  try {
    const firstLetter = query[0].toLowerCase();
    const games = await Game.findAll({
      where: {
        title: {
          [Op.iLike]: `%${query}%`, // Recherche insensible à la casse
        },
      },
      order: [
        [
          Sequelize.literal(`CASE WHEN LOWER(title) LIKE '${firstLetter}%' THEN 0 ELSE 1 END`),
         'ASC',
        ],
        ['title', 'ASC'],
      ],
      limit: 20,       
    });

    if (!games || games.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        error: 'Aucun jeu trouvé pour cette recherche' 
      });
    }

    return res.status(StatusCodes.OK).json(games);
  } catch (error) {
    console.error('Erreur lors de la recherche de jeux :', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      error: 'Erreur serveur lors de la recherche de jeux' 
    });
  }
}