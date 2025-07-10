import { Challenge } from '../database/models/challenge.model.js';
import { Participation } from '../database/models/participation.model.js';
//import { User } from '../database/models/user.model.js';
import { StatusCodes } from 'http-status-codes';
import { Game, User } from '../database/models/index.js'; // pour vérifier l'existence de game et user


// Récupérer tous les challenges
export async function getAll(req, res) {
  try {
    const challenges = await Challenge.findAll();

    if (!challenges || challenges.length === 0) {
      return res.status(404).json({ error: 'No challenges found' });
    }

    return res.json(challenges);
  } catch (error) {
    console.error('Error fetching challenges:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Récupérer un challenge par son ID
export async function getById(req, res) {
  try {
    const challenge = await Challenge.findByPk(req.params.id);

    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    return res.json(challenge);
  } catch (error) {
    console.error('Error fetching challenge:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Créer un nouveau challenge
export async function create(req, res) {
  try {
    const { title, description, rules, game_by, created_by } = req.body;

    if (!title || !description || !rules || !game_by || !created_by) {
      return res.status(400).json({ error: 'Champs manquants' });
    }

    // Vérifier que le jeu existe
    const gameExists = await Game.findByPk(game_by);
    if (!gameExists) {
      return res
        .status(400)
        .json({ error: `Jeu avec ID ${game_by} introuvable.` });
    }

    // Optionnel : vérifier que l'utilisateur existe
    // const userExists = await User.findByPk(created_by);
    // if (!userExists) {
    //   return res.status(400).json({ error: `Utilisateur avec ID ${created_by} introuvable.` });
    // }

    const newChallenge = await Challenge.create({
      title,
      description,
      rules,
      game_by,
      created_by,
    });

    return res.status(201).json(newChallenge);
  } catch (error) {
    console.error('Erreur lors de la création du challenge :', error);
    res.status(500).json({ success: false, message: 'Erreur serveur lors de la création du challenge.' });
  };
}

export async function getParticipations(req, res) {
  const challengeId = Number(req.params.id);

  if (!challengeId) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid challenge ID' });
  }

  try {
    const participations = await Participation.findAll({
      where: { challenge_id: challengeId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'pseudo', 'avatar']
        }
      ],
      order: [['created_at', 'DESC']],
    });

    return res.status(StatusCodes.OK).json(participations);
  } catch (err) {
    console.error('Erreur lors du fetch des participations :', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erreur serveur' });
  }
};