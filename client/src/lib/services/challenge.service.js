// auth.service.js
import api from '../api.js';

// Fonction pour récupérer les informations du challenge
export async function getChallenge(challengeId) {
  if (!challengeId) {
    throw new Error('SERVICE Challenge ID is required');
  }

  try {
    const challenge = await api(`/challenges/${challengeId}`, "GET");
   // console.debug(`[getChallenge] Challenge retrieved:`, challenge);
    return challenge;
  } catch (error) {
    console.error(`SERVICE [getChallenge] Failed to fetch challenge with ID ${challengeId}:`, error);
    throw error;
  }
}

export async function getChallengesByGameId(gameId) {
  if (!gameId) {
    throw new Error('SERVICE Game ID is required');
  }

  try {
    const challenges = await api(`/games/${gameId}/challenges`, "GET");
    // console.debug(`[getChallengesByGameId] Challenges retrieved for game ID ${gameId}:`, challenges);
    return challenges;
  } catch (error) {
    console.error(`SERVICE [getChallengesByGameId] Failed to fetch challenges for game ID ${gameId}:`, error);
    throw error;
  }
}

// Fonction de création d'un challenge
export async function challengeCreation(title, description, rules, created_by, game_by) {
  try {
    const challengeCreated = await api('/challenges', "POST", { title, description, rules, created_by, game_by }, true);

    console.log('SERVICE Challenge créé avec succès :', challengeCreated);
    return challengeCreated;

  } catch (error) {
    console.error('SERVICE Échec de création :', error);
    throw error;
  }
}

// Fonction pour récupérer les informations de likes du challenge
export async function getLikes(challengeId) {
  if (!challengeId) {
    throw new Error('SERVICE Challenge ID is required');
  }

  try {
    const likes = await api(`/challenges/${challengeId}/likes`, "GET");
    //console.debug(`[getLikes] Likes retrieved:`, likes);
    return likes;
  } catch (error) {
    console.error(`SERVICE [getLikes] Failed to fetch likes with ID ${challengeId}:`, error);
    throw error;
  }
}

// Fonction d'ajout d'un like au challenge
export async function addLike(challengeId) {

  //console.debug(`[addLike] Adding like to challenge with ID: ${challengeId}`);
  
  if (!challengeId) {
    throw new Error('Challenge ID is required');
  }

  try {
    const likeAdded = await api(`/challenges/${challengeId}/likes`, "POST");

    //console.log('Like ajouté avec succès :', likeAdded);
    return likeAdded;

  } catch (error) {
    console.error('Échec d\'ajout du like :', error);
    throw error;
  }
}

// Fonction toggle like sur un challenge
export async function toggleLike(challengeId) {
  //console.debug(`[toggleLike] Toggle like for challenge ID: ${challengeId}`);

  if (!challengeId) {
    throw new Error('Challenge ID is required');
  }

  try {
    // 1. Vérifie si l'utilisateur a déjà liké
    const statusRes = await api(`/challenges/${challengeId}/likes/status`, 'GET', null, true);
    const { hasLiked } = statusRes;
    //console.log("SERVICE response hasLiked", hasLiked)

    // 2. Ajoute ou supprime le like selon le statut
    const method = hasLiked ? 'DELETE' : 'POST';
    //console.log('SERVICE method: ', method)
    const likeRes = await api(`/challenges/${challengeId}/likes`, method, null, true);

    const message = hasLiked ? 'Like supprimé avec succès' : 'Like ajouté avec succès';
    //console.log(message);

    return { message, likedNow: !hasLiked };
  } catch (error) {
    console.error('SERVICE Erreur toggleLike:', error);
    throw error;
  }
}

// Fonction pour vérifier si l'utilisateur a liké le challenge  
export async function checkIfLiked(challengeId) {
  if (!challengeId) {
    throw new Error('SERVICE Challenge ID is required');
  }
  try {
    const status = await api(`/challenges/${challengeId}/likes/status`, "GET", null, true); // Authentification requise
    //console.debug(`[checkIfLiked] Like status retrieved:`, status);
    return status;
  } catch (error) {
    console.error(`SERVICE [checkIfLiked] Failed to fetch like status for challenge ID ${challengeId}:`, error);
    throw error;
  }  
}