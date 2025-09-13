// src/routes/challenges/[challengesId]/+page.server.js
import { error } from '@sveltejs/kit';
import { getChallenge } from '$lib/services/challenge.service.js';
import { getGameInfos } from '$lib/services/game.service.js';
import { getParticipations } from '$lib/services/participation.service.js';
import { get } from 'svelte/store';


export async function load({ params }) {
  const { challengeId } = params;
  if (!challengeId) {
  //  console.warn("Paramètre challengeId manquant !");
     return {};
  }
  try {
    const challenge = await getChallenge(challengeId);
    const game = await getGameInfos(challenge.game_by);
    const participations = await getParticipations(challengeId) || [];
    return { challenge, challengeId, participations, game };
  } catch (err) {
    console.error('Erreur dans +page.server.js :', err);
    throw error(500, 'Erreur lors du chargement des données');
  }
  //console.log(`SERVER Bonjour je suis le ${challengeId}`);
  
}

