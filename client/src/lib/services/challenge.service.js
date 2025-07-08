// auth.service.js
import api from '../api.js';

export async function challengeCreation(title, description, rules, created_by, game_by) {
  try {
    const challengeCreated = await api('/challenges', "POST", { title, description, rules, created_by, game_by });
    console.log('Challenge créé avec succès :', challengeCreated);
    return challengeCreated; // ← on retourne bien la réponse
  } catch (error) {
    console.error('Échec de création :', error);
    throw error;
  }
}