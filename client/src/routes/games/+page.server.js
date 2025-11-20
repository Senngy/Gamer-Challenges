// +page.server.js
import { error } from '@sveltejs/kit';
import { getRandomGames } from '$lib/services/game.service.js';

export async function load() {
	try {
		const games = await getRandomGames();
		if (!games) {
            throw error(404, 'Page Server | Catalogue de jeux introuvable');
		}
		return { games };
	} catch (err) {
		console.error('Page Server | Erreur chargement jeux :', err);
		// Déclenche la page d'erreur SvelteKit
		throw error(500, 'Échec du chargement des données');
	}
}