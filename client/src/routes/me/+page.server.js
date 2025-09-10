// +page.server.js
import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { logout, getCurrentUser } from '$lib/services/auth.service.js'; // Fonction de déconnexion
/*
export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(302, '/'); // redirection immédiate
	}
	try {
		const userInfos = await getCurrentUser();
		if (!userInfos) {
			throw error(404, 'Page Server | Utilisateur introuvable');
		}
		return { userInfos };
	} catch (err) {
		console.error("Page Server | Erreur chargement des informations de l'utilisateur :", err);
		// ✅ Déclenche la page d'erreur SvelteKit
		throw error(500, 'Échec du chargement des données');
	}
}
*/