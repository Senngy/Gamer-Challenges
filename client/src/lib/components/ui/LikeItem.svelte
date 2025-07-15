<script>
	// LikeItem.svelte
	import { onMount } from 'svelte';
	import { getLikes, addLike, toggleLike } from '$lib/services/challenge.service.js';
	import { getAuth, isAuthenticated } from '$lib/store/authStore.svelte.js';

	let { challenge, classCSS = '' } = $props(); // Récuperation des propriétés passées au composant enfant

	let likes = $state(0);
	let liked = $state(false);
	let error = $state('');
	$effect(() => {
		getAuth();
	});

	const handleToggleLike = async () => {
    /*
		console.log('🔘 Bouton cliqué');
		console.log('challenge', challenge);
		console.log(challenge.id, 'ID du challenge');
		console.log('CLASSCSS', classCSS);
    */
		if (!isAuthenticated()) {
			alert('Veuillez vous connecter pour liker ce contenue');
			return;
		}
		try {
			const { likedNow } = await toggleLike(challenge.id); // Nous renvois true si l'utilisateur n'a pas encore liké et ajoute un like sinon supprime le like
			if (likedNow) {
				likes += 1;
				//console.log('✅ Like ajouté');
			}
			if (!likedNow) {
				likes -= 1;
				//console.log('❌ like supprimé ');
			}
			//console.log('FRONT likedNow', likedNow);
		} catch (err) {
			console.error('❌ handleToggle Like - Erreur lors du like :', err.message);
			alert('Oups.. Il y a un problème de notre côté lors du like');
		}
	};

	async function refreshLikes() {
		const res = await getLikes(challengeId);
		likes = res.likes;
		liked = res.liked;
	}

	$effect(() => {
		if (challenge.user_id) refreshLikes();
	});

	// Récupération initiale des likes une fois le composant monté
	onMount(() => {
		const fetchLikes = async () => {
			//console.log('📥 onMount Récupération des likes pour le challenge', challenge.id);
			try {
				const data = await getLikes(challenge.id);
				likes = data.likes;
			//	console.log('✔️ onMount Likes initiaux:', likes);
			} catch (err) {
				console.error('❌ onMount Erreur récupération des likes :', err);
			}
		};

		fetchLikes();
	});
</script>

<button type="button" class={`like-button ${classCSS}`} on:click={handleToggleLike}>
	❤️ <span class="like-count">{likes}</span>
</button>

<style>
	.like-button {
		background: none;
		border: 1px solid #ccc;
		padding: 8px 12px;
		font-size: 1rem;
		cursor: pointer;
		border-radius: 6px;
		transition: all 0.2s;
	}

	.like-count {
		margin-left: 6px;
	}

	.like-button:disabled {
		opacity: 0.6;
		cursor: wait;
	}
	.btn-from-challenge-page {
		min-width: 200px;
		color: white;
		margin: 1rem auto;
	}
	.btn-from-challenge-item {
		width: 300px;
	}
	.error {
		color: #ff6b6b;
		text-align: center;
		margin-bottom: 1rem;
	}
</style>
