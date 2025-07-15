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
    console.log('SERVICE Participation créée avec succès :', participationCreated);
    return participationCreated; // ← on retourne bien la réponse
  } catch (error) {
    console.error('SERVICE Échec de création :', error);
    throw error;
  }
}


export async function getParticipations(challenge_id) {
  if (!challenge_id) {
    throw new Error('SERVICE Challenge ID is required');
  }
  //console.log("SERVICE variable", challenge_id)
  try {
    const res = await api(`/challenges/${challenge_id}/participations`, "GET");
   // console.log("SERVICE réponse", res)
    return res;
  } catch (error) {
    console.error(`SERVICE [getParticipations] Failed to fetch participations for challenge ID ${challenge_id}:`, error);
    throw error;
  }
}

// Fonction pour récupérer les informations de likes du challenge
export async function getLikes(participationId) {
  if (!participationId) {
    throw new Error('SERVICE participation ID is required');
  }

  try {
    const likes = await api(`/participations/${participationId}/likes`, "GET");
    //console.debug(`[getLikes] Likes retrieved:`, likes);
    return likes;
  } catch (error) {
    console.error(`SERVICE [getLikes] Failed to fetch likes with ID ${participationId}:`, error);
    throw error;
  }
}

// Fonction d'ajout d'un like au participation
export async function addLike(participationId) {

  //console.debug(`[addLike] Adding like to participation with ID: ${participationId}`);
  
  if (!participationId) {
    throw new Error('SERVICE participation ID is required');
  }

  try {
    const likeAdded = await api(`/participations/${participationId}/likes`, "POST");

   // console.log('SERVICE Like ajouté avec succès :', likeAdded);
    return likeAdded;

  } catch (error) {
    console.error('SERVICE Échec d\'ajout du like :', error);
    throw error;
  }
}

// Fonction toggle like sur un participation
export async function toggleLike(participationId) {
  //console.debug(`[toggleLike] Toggle like for participation ID: ${participationId}`);

  if (!participationId) {
    throw new Error('participation ID is required');
  }

  try {
    // 1. Vérifie si l'utilisateur a déjà liké
    const statusRes = await api(`/participations/${participationId}/likes/status`, 'GET');
    const { hasLiked } = statusRes;
    //console.log("SERVICE response hasLiked", hasLiked)

    // 2. Ajoute ou supprime le like selon le statut
    const method = hasLiked ? 'DELETE' : 'POST';
    //console.log('SERVICE method: ', method)
    const likeRes = await api(`/participations/${participationId}/likes`, method);

    const message = hasLiked ? 'Like supprimé avec succès' : 'Like ajouté avec succès';
    //console.log(message);

    return { message, likedNow: !hasLiked };
  } catch (error) {
    console.error('SERVICE Erreur toggleLike:', error);
    throw error;
  }
}