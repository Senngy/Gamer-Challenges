// src/routes/games/[gameId]/+page.server.js
import { error } from '@sveltejs/kit';
import api from '$lib/api.js';
import { getGameInfos } from '$lib/services/game.service.js';
import { getChallengesByGameId } from '$lib/services/challenge.service.js';
import { getParticipations } from '$lib/services/participation.service.js';
import { get } from 'svelte/store';

export async function load({ fetch, params }) {
	const { gameId } = params;
  
	if (!gameId || isNaN(+gameId)) {
		throw error(400, 'Paramètre gameId manquant ou invalide');
	}
   
	try {
		const game = await getGameInfos(gameId);
		const challenges = await getChallengesByGameId(gameId) || [];
    const participationsByChallenge = {}; // Objet pour stocker les participations par challenge

    // Récupérer les participations pour chaque challenge
    for (const challenge of challenges) {
      const participations = await getParticipations(challenge.id);
      participationsByChallenge[challenge.id] = participations || [];
    }
    // Ajouter les participations à chaque challenge
    challenges.forEach(challenge => {
      challenge.participations = participationsByChallenge[challenge.id] || [];
    });
    
		if (!game) {
			throw error(404, 'Jeu introuvable');
		}
    
		return { game, challenges };
	} catch (err) {
		console.error('Erreur dans +page.server.js :', err);
		throw error(500, 'Erreur lors du chargement des données');
	}
}
