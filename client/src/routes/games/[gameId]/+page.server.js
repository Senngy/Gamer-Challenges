// src/routes/games/[gameId]/+page.server.js
import { error } from '@sveltejs/kit';
// import api from '$lib/api.js';


export async function load({ fetch, params }) {
  const { gameId } = params;

  if (!gameId || isNaN(+gameId)) {
    throw error(400, 'Paramètre gameId manquant ou invalide');
  }

  try {
    const [gameRes, challengesRes] = await Promise.all([
      fetch(`http://localhost:3000/games/${gameId}`),
      fetch(`http://localhost:3000/games/${gameId}/challenges`) // CHANGER LE FETCH POUR LES CHALLENGES D'UN JEU
    ]);

    if (!gameRes.ok) throw error(gameRes.status, 'Jeu introuvable');

    const game = await gameRes.json();
    const challenges = challengesRes.ok ? await challengesRes.json() : [];
    console.log('challenges from +page.server.js:', challenges);

    return { game, challenges };
  } catch (err) {
    console.error('Erreur dans +page.server.js :', err);
    throw error(500, 'Erreur lors du chargement des données');
  }
}