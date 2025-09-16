<script>
	// LikeItem.svelte
	import { onMount } from 'svelte';
	import { getLikes, addLike, toggleLike, checkIfLiked } from '$lib/services/challenge.service.js';
	import { getAuth, isAuthenticated } from '$lib/store/authStore.svelte.js';
	import { toast } from 'svelte-sonner';

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
			toast.warning('Veuillez vous connecter pour liker ce contenue');
			return;
		}
		try {
			const { likedNow } = await toggleLike(challenge.id); // Nous renvois true si l'utilisateur n'a pas encore liké et ajoute un like sinon supprime le like
			liked = likedNow; // Met à jour l'état liked avec la valeur retournée
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
	}
	$effect(() => {
		if (challenge.user_id) refreshLikes();
	});
	// Fonction si l'utilisateur a déjà liké
	async function hasLiked() {
		try {
			const res = await checkIfLiked(challenge.id);
			// console.log('FRONT hasLiked res:', res);
			if (res.hasLiked) {
				liked = res.hasLiked;
				// console.log('✔️ FRONT hasLiked liked:', liked);
			} else {
				liked = false;
				// console.log('✔️ FRONT hasLiked Pas encore liké:', liked);
			}
		} catch (err) {
			console.error('❌ hasLiked Erreur lors de la vérification du like :', err);
		}
	}
	// Récupération initiale des likes une fois le composant monté
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
	onMount(() => {
		fetchLikes();

		hasLiked();
	});
</script>

<button type="button" class={`like-button ${classCSS}`} class:liked on:click={handleToggleLike}>
	<span class="like-count">{likes}</span>
</button>

<style>
	.like-button {
		background-color: rgba(255, 255, 255, 0.1);
		border: 1px solid #ccc;
		padding: 8px 12px;
		font-size: 1rem;
		cursor: pointer;
		border-radius: 20px;
		transition: all 0.2s;
		width: fit-content;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.like-button::before {
		content: '';
		display: inline-block;
		width: 20px;
		height: 20px;
		margin-right: 6px;
		background-image: url('/images/icons/heart-50-outlined.png');
		background-size: cover;
		background-repeat: no-repeat;
	}

	.like-button:hover {
		background: var(--btn-color);
	}

	.liked {
		color: var(--text-color-red);
		animation: pulse 0.2s ease-in-out;
	}

	.like-button.liked::before {
		content: '';
		display: inline-block;
		width: 20px;
		height: 20px;
		margin-right: 6px;
		background-image: url('/images/icons/heart-50-filled.png');
		background-size: cover;
		background-repeat: no-repeat;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
		}
	}
	.like-count {
		margin-left: 6px;
	}
	.error {
		color: #ff6b6b;
		text-align: center;
		margin-bottom: 1rem;
	}
	.like-button:disabled {
		opacity: 0.6;
		cursor: wait;
	}
	.btn-from-challenge-page,
	.btn-from-challenge-item,
	.btn-from-participation {
		min-width: 100px;
		color: white;
	}
</style>
