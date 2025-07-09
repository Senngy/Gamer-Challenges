import { Challenge } from '../database/models/challenge.model.js';
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
    console.error('Erreur lors de la création du challenge:', error);
    return res
      .status(500)
      .json({ error: 'Erreur lors de la création du challenge' });
  }
}
