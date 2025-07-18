// +page.server.js '/' Home
import { error } from '@sveltejs/kit';
import { getRandomGames, getTopGames } from '$lib/services/game.service.js';
import { getTopByChallengeLikes, getTopByParticipationLikes } from '$lib/services/user.service.js';
const API_URL = import.meta.env.VITE_API_URL;

function addAvatarUrl(user) {
	return {
		...user,
		avatar: user.avatar ? `${API_URL}${user.avatar}` : null
	};
}

export async function load() {

    try {
        const [randomGames, topGames] = await Promise.all([
			getRandomGames(),
			getTopGames()
		]);
        const [rawLeadersByChallenge, rawLeadersByParticipation] = await Promise.all([
			getTopByChallengeLikes(),
            getTopByParticipationLikes()
		]);

        const leadersByChallenge = rawLeadersByChallenge.map(addAvatarUrl);
		const leadersByParticipation = rawLeadersByParticipation.map(addAvatarUrl);
        return {
            randomGames,
            topGames,
            leadersByChallenge,
            leadersByParticipation
        };
	} catch (error) {
		console.error('Erreur chargement jeux :', error);

		// ✅ Déclenche la page d'erreur SvelteKit
		throw error(500, 'Échec du chargement des données');
	}
}