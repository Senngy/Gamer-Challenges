<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { getUserById } from '$lib/services/user.service.js';
	import LikeItem from '$lib/components/ui/likes/LikeItem.svelte';

	const { challenge } = $props();
	const dispatch = createEventDispatcher();
	const API_URL = import.meta.env.VITE_API_URL;
	
	function getAvatarUrl(user) {
		if (!user?.avatar) return 'https://via.placeholder.com/100';
		return import.meta.env.MODE === 'production' ? user.avatar : `${API_URL}${user.avatar}`;
	}

	let challengeCreator = $state({
		pseudo: '',
		avatar: ''
	});

	onMount(async () => {
		// Utilisation de onMount pour récupérer les données du challenge lors du chargement du composant
		// Récupération des détails du challenge
		try {
			const { pseudo, avatar } = await getUserById(challenge.created_by); // Récupération des informations de l'utilisateur connecté
			// console.log('onMount pseudo :', pseudo);
			// console.log('onMount avatar :', avatar);

			challengeCreator = {
				// remplissage de l'objet challengeCreator avec les données de l'utilisateur
				pseudo: pseudo,
				avatar: avatar
			};
		} catch (err) {
			console.error('Erreur récupération challenge :', err);
		}
	});
</script>

<div class="challenge__item">
	<div
		type="button"
		class="challenge__image"
		role="button"
		tabindex="0"
		on:click={() => dispatch('click')}
	>
		<div class="challenge__participation-count">
			{challenge?.participations?.length ?? 0} participations
		</div>
	</div>
	<div class="challenge__content">
		<h3 class="challenge__title">{challenge.title}</h3>
		<p class="challenge__description">{challenge.description}</p>
		<div class="challenge_created-by">
			<p>Challenge créé par</p>
			<div class="leaderboard__player-avatar avatar" aria-hidden="true">
				<img
					src={`${getAvatarUrl(challengeCreator)}` || 'https://via.placeholder.com/100'}
					alt="Avatar"
					class="avatar-image"
				/>
			</div>
			<p class="challenge__user-name">{challengeCreator.pseudo}</p>
		</div>
		{#if challenge}
			{console.log('✅ challenge est prêt', challenge)}
			<LikeItem classCSS="btn-from-challenge-item" {challenge} />
		{:else}
			<p>Chargement...</p>
		{/if}
	</div>
</div>

<style>
	.challenge__image {
		background-image: url('/images/genericChallenge.png');
	}
	.avatar {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 0.5rem;
	}

	.avatar-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		border-radius: 50%;
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
	}
	.challenge__user-name {
		font-size: 1.3rem;
	}
	.challenge__description,
	.challenge__title {
		display: -webkit-box;
		display: box; /* fallback "standard" (expérimental) */

		-webkit-box-orient: vertical;
		box-orient: vertical;
		box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.challenge__title {
		-webkit-line-clamp: 2; /* nombre de lignes max */
		line-clamp: 2; /* futur standard */
	}
	.challenge__description {
		-webkit-line-clamp: 1; /* nombre de lignes max */
		line-clamp: 1; /* futur standard */
	}
	.challenge__participation-count {
		border-radius: var(--general-border-radius);
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		font-family: 'Orbitron', sans-serif;
		color: white;
		text-shadow: rgb(0, 0, 0) 1px 1px 2px;
	}
</style>
