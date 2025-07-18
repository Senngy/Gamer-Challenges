// +page.server.js
import { error } from '@sveltejs/kit';
import { getRandomGames } from '$lib/services/game.service.js';

export async function load() {
	try {
		const games = await getRandomGames();
		if (!games) {
			// return { games: [] };
            throw error(404, 'Page Server | Catalogue de jeux introuvable');
		}
		return { games };
	} catch (error) {
		console.error('Page Server | Erreur chargement jeux :', error);
		// ✅ Déclenche la page d'erreur SvelteKit
		throw error(500, 'Échec du chargement des données');
	}
}