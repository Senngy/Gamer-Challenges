// auth.service.js
import api from '../api.js';

export async function participationCreation(media_link, description, user_id, challenge_id) {
  try {
    const participationCreated = await api('/participations', "POST", { media_link, description, user_id, challenge_id });
    console.log('Participation créée avec succès :', participationCreated);
    return participationCreated; // ← on retourne bien la réponse
  } catch (error) {
    console.error('Échec de création :', error);
    throw error;
  }
}

export async function fetchParticipations(challenge_id) {
	const res = await fetch(`/api/challenges/${challenge_id}/participations`);
	if (res.ok) {
		return await res.json();
	} else {
		console.error("Erreur de récupération des participations");
		return [];
	}
}