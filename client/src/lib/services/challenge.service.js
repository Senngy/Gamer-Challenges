// auth.service.js
import api from '../api.js';

// Fonction pour récupérer les informations du challenge
export async function getChallenge(challengeId) {
  if (!challengeId) {
    throw new Error('Challenge ID is required');
  }

  try {
    const challenge = await api(`/challenges/${challengeId}`, "GET");
    console.debug(`[getChallenge] Challenge retrieved:`, challenge);
    return challenge;
  } catch (error) {
    console.error(`[getChallenge] Failed to fetch challenge with ID ${challengeId}:`, error);
    throw error;
  }
}

// Fonction de création d'un challenge
export async function challengeCreation(title, description, rules, created_by, game_by) {
  try {
    const challengeCreated = await api('/challenges', "POST", { title, description, rules, created_by, game_by });

    console.log('Challenge créé avec succès :', challengeCreated);
    return challengeCreated;

  } catch (error) {
    console.error('Échec de création :', error);
    throw error;
  }
}