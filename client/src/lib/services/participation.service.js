// auth.service.js
import api from '../api.js';

export async function participationCreation(media_link, description, user_id, challenge_id) {
  /*
  console.log("SERVICE media_link", media_link)
  console.log("SERVICE description", description) 
  console.log("SERVICE user_id", user_id)
  console.log("SERVICE challenge_id", challenge_id)
  */
  try {
    const participationCreated = await api('/participations', "POST", { media_link, description, user_id, challenge_id });
    console.log('Participation créée avec succès :', participationCreated);
    return participationCreated; // ← on retourne bien la réponse
  } catch (error) {
    console.error('Échec de création :', error);
    throw error;
  }
}


export async function getParticipations(challenge_id) {
  if (!challenge_id) {
    throw new Error('Challenge ID is required');
  }
  console.log("SERVICE variable", challenge_id)
  try {
    const res = await api(`/challenges/${challenge_id}/participations`, "GET");
    console.log("SERVICE réponse", res)
    return res;
  } catch (error) {
    console.error(`[getParticipations] Failed to fetch participations for challenge ID ${challenge_id}:`, error);
    throw error;
  }
}