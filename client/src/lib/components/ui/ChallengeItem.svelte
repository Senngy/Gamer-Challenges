<script>
	import { onMount } from 'svelte';
	export let challenge;
	// let challenge = $props();
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let challengeCreator = {
		pseudo: '',
		avatar: ''
	};

	onMount(async () => {
		// Utilisation de onMount pour récupérer les données du challenge lors du chargement du composant
		// Récupération des détails du challenge
		try {
			const { pseudo, avatar } = await getUserInfo(challenge.created_by); // Récupération des informations de l'utilisateur connecté
			console.log('onMount pseudo :', pseudo);
			console.log('onMount avatar :', avatar);

			challengeCreator = {
				// remplissage de l'objet challengeCreator avec les données de l'utilisateur
				pseudo,
				avatar
			};
		} catch (err) {
			console.error('Erreur récupération challenge :', err);
		}
	});

	async function getUserInfo(userId) {
		try {
			const res = await fetch(`http://localhost:3000/users/${userId}`);
			if (!res.ok) {
				throw new Error(`Erreur HTTP ${res.status}`);
			}
			const user = await res.json();
			console.log('User info récupéré :', user);
			return {
				pseudo: user.pseudo, // ou user.username, selon ta structure
				avatar: user.avatar // ou user.image, selon ta structure
			};
		} catch (err) {
			console.error('Erreur getUserInfo :', err);
			return null;
		}
	}

	// Exemple : accès au titre
	// challenge.title, challenge.description, etc.
</script>

<div class="challenge__item">
	<div class="challenge__image" role="button" tabindex="0" on:click={() => dispatch('click')}>
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
		<div class="challenge__like-count">
			Likes : {challenge.challenge_likes}
		</div>
	</div>
</div>

<style>
	.challenge__image {
		background-image: url('/images/genericChallenge.png');
	}
</style>
