<script>
	// LikeItemParticipation.svelte
	import { onMount } from 'svelte';
	import { getLikes, addLike, toggleLike } from '$lib/services/participation.service.js';
    import { getAuth, isAuthenticated } from '$lib/store/authStore.svelte.js';

	let { participation, classCSS = '' } = $props();

	let likes = $state(0);
	let liked = $state(false);

	$effect(() => {
		getAuth();
	});

	const handleToggleLike = async () => {
        /*
		console.log('🔘 Bouton cliqué');
		console.log('participation', participation);
		console.log(participation.id, 'ID de la participation');
		console.log('CLASSCSS', classCSS);
        */
		if (!isAuthenticated()) {
			alert('Veuillez vous connecter pour liker ce contenue');
			return;
		}
		try {
			const { likedNow } = await toggleLike(participation.id); // Nous renvois true si l'utilisateur n'a pas encore liké et ajoute un like sinon supprime le like
			if (likedNow) {
				likes += 1;
				//console.log('✅ Like ajouté');
			}
			if (!likedNow) {
				likes -= 1;
				//console.log('❌ Like supprimé');
			}
			//console.log('FRONT likedNow', likedNow);
		} catch (err) {
			console.error('❌ Erreur lors du like :', err.message);
			alert('Oups.. Il y a un problème de notre côté lors du like');
		}
	};

	async function refreshLikes() {
		const res = await getLikes(participation.id);
		likes = res.likes;
		liked = res.liked;
	}

	$effect(() => {
		if (participation.user_id) refreshLikes();
	});

	// Récupération initiale des likes une fois le composant monté
	onMount(() => {
		const fetchLikes = async () => {
			//console.log('📥 onMount Récupération des likes de la participation', participation.id);
			try {
				const data = await getLikes(participation.id);
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
	.btn-from-participation {
		min-width: 200px;
		color: white;
		margin: 1rem auto;
	}
</style>
