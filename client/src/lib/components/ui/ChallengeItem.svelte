<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { getUserById } from '$lib/services/user.service.js'
	import LikeItem from '$lib/components/ui/LikeItem.svelte';

	const { challenge } = $props();
	const dispatch = createEventDispatcher();
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
			{challenge?.participations ?? 0} participations
		</div>
	</div>
	<div class="challenge__content">
		<h3 class="challenge__title">{challenge.title}</h3>
		<p class="challenge__description">{challenge.description}</p>
		<div class="challenge_created-by">
			<p>Challenge created by</p>
			<div class="challenge__user-avatar">{challengeCreator.avatar}</div>
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
</style>
