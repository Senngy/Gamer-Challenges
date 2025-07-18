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
    //console.log('load called')
    try {
        const [randomGames, topGames] = await Promise.all([
			getRandomGames(),
			getTopGames()
		]);
        const [rawLeadersByChallenge, rawLeadersByParticipation] = await Promise.all([
			getTopByChallengeLikes(),
            getTopByParticipationLikes()
		]);
        //console.log('page server Random games:', randomGames); // Debug log
        //console.log('page server Top games:', topGames); // Debug log
        //console.log('page server leadersByChallenge', leadersByChallenge)
        //console.log('page server leadersByParticipation', leadersByParticipation)
        const leadersByChallenge = rawLeadersByChallenge.map(addAvatarUrl);
		const leadersByParticipation = rawLeadersByParticipation.map(addAvatarUrl);
        return {
            randomGames,
            topGames,
            leadersByChallenge,
            leadersByParticipation
        };
    } catch (err) {
        console.error('Erreur chargement jeux :', err);
        return {
            randomGames: [],
            topGames: [],
            leadersByChallenge: [],
            leadersByParticipation: []
        };
    }
}