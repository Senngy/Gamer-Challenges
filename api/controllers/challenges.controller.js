import { Challenge } from '../database/models/challenge.model.js';
import { StatusCodes } from 'http-status-codes';

export async function getAll(req, res) {
  const challenges = [
        { title: "Tuer 10 ennemis en 3 minutes", description: "Défi rapidité multijoueur", rules: "Pas de grenades, pas de véhicules", game_by: 1, created_by: 1 },
        { title: "Gagner une course en difficulté max", description: "Conduite extrême", rules: "Pas de rewind, IA max", game_by: 2, created_by: 2 },
        { title: "Faire un pentakill en ranked", description: "Objectif ultime", rules: "En partie classée uniquement", game_by: 3, created_by: 3 }
    ];
    if (!challenges || challenges.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "No challenges found" });
    }
  return res.json(challenges);
}

export async function getById(req, res) {
  const challenge = {
    title: "Call of Duty: Modern Warfare",
    image: "cod.jpg",
    description: "FPS militaire",
    platform: "PC,PS5"
  };
    if (!challenge) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Challenge not found" });
    }
  return res.json(challenge);
}

export async function addChallenge(req, res) {
  const { title, description, rules, created_by, game_by } = req.body;

  // Validation simple
  if (!title || !description || !rules || !created_by || !game_by) {
    return res.status(400).json({ success: false, message: 'Champs manquants' });
  }

  try {
    const challenge = await Challenge.create({
      title,
      description,
      rules,
      created_by,
      game_by
    });

    res.status(201).json({
      success: true,
      message: 'Challenge créé avec succès',
      challenge
    });
  } catch (error) {
    console.error('Erreur lors de la création du challenge :', error);
    res.status(500).json({ success: false, message: 'Erreur serveur lors de la création du challenge.' });
  };
}