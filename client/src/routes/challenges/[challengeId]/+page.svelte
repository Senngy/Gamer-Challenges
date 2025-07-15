<script>
	import ParticipationItem from '$lib/components/ui/ParticipationItem.svelte';
	import Btn from '$lib/components/auth/Btn.svelte';
	import Input from '$lib/components/auth/Input.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';
	import ParticipationForm from '$lib/components/participation/ParticipationForm.svelte';
	import FilterText from '$lib/components/ui/FilterText.svelte';
	import LikeItem from '$lib/components/ui/LikeItem.svelte';
	import { getChallenge } from '$lib/services/challenge.service.js';
	import { getParticipations, participationCreation } from '$lib/services/participation.service.js';
	import { getUserById } from '$lib/services/user.service.js';
	import { getGameInfos } from '$lib/services/game.service.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getAuth, isAuthenticated, authStore } from '$lib/store/authStore.svelte.js';

	const { data } = $props(); // Récupération des données passées par le routeur SvelteKit
	const { challengeId } = data; // Récupération de l'ID du challenge depuis les données
	//console.log(`PAGE Bonjour je suis le ${challengeId}`);

	const challenge_id = challengeId;

	let challenge = $state({
		id: '',
		title: '',
		description: '',
		rules: '',
		created_by: '',
		game_by: ''
	});

	let participationCreator = $state({
		id: '',
		pseudo: '',
		avatar: ''
	});

	let challengeCreator = $state({
		id: '',
		pseudo: '',
		avatar: ''
	});
	let participations = $state([]); // Initialisation de la liste des participations
	let showModal = $state(false); // État pour contrôler l'affichage du modal
	let error = $state(''); // État pour les messages d'erreur
	let success = $state(''); // État pour les messages de succès
	let media_link = $state(''); // État pour le lien du média
	let description = $state(''); // État pour la description de la participation
	let user_id = $state(null); // Remplacez par l'ID de l'utilisateur connecté
	// console.log(`user_id: ${user_id}`)

	onMount(() => {
		getAuth();
		const currentUserId = authStore.user?.id;
		if (!currentUserId) return;

		user_id = currentUserId;
	});
	// à chaque fois que authStore change, on met à jour user_id
	/*
	$effect(() => {
		user_id = authStore.user?.id ?? null;
	});
*/
	onMount(async () => {
		// Utilisation de onMount pour récupérer les données du challenge lors du chargement du composant
		// Récupération des détails du challenge
		try {
			const [{ id, title, description, rules, created_by, game_by }, participationsList] =
				await Promise.all([getChallenge(challenge_id), getParticipations(challenge_id)]);

			const [gameInfo, userInfo] = await Promise.all([
				getGameInfos(game_by), // Permet d'avoir les infos du jeu lié au challenge
				getUserInfo(user_id) // Permet de recuper les infos de l'user connecté pour la création de participation
			]);
			const creatorChallengeInfos = await getUserInfo(created_by); // Permet de récuperer les infos du createur du challenge
			// ici on ajoute les infos a nos variables réactives
			challenge = { id, title, description, rules, created_by, game_by, image: gameInfo.image };
			participationCreator = { pseudo: userInfo.pseudo, avatar: userInfo.avatar };
			participations = participationsList;
			challengeCreator = {
				id: creatorChallengeInfos.id,
				pseudo: creatorChallengeInfos.pseudo,
				avatar: creatorChallengeInfos.avatar
			};
		} catch (err) {
			console.error('Erreur récupération challenge :', err);
			error = 'Impossible de charger les données';
		}
	});

	async function getGameImage(gameId) {
		// Fonction pour récupérer l'image du jeu associé au challenge
		try {
			const game = await getGameInfos(gameId);
			return game.image;
		} catch (err) {
			console.error('Erreur getGameImage :', err);
			return null;
		}
	}

	async function getUserInfo(userId) {
		if (!userId) return null;
		try {
			const user = await getUserById(userId);
			//console.log('User info récupéré :', user);
			return {
				pseudo: user.pseudo, // ou user.username, selon ta structure
				avatar: user.avatar, // ou user.image, selon ta structure
				user_id: user.id
			};
		} catch (err) {
			console.error('Erreur getUserInfo :', err);
			return null;
		}
	}

	const handleSubmitParticipation = async (e) => {
		console.log('handleSubmitParticipation called');
		e.preventDefault();
		console.log('handleSubmit user_id', user_id);
		if (!isAuthenticated()) {
			error = 'Veuillez vous connecter pour créer un challenge';
			return;
		}
		if (!media_link.trim() || !description.trim()) {
			error = 'Veuillez remplir tous les champs.';
			return;
		}
		/*
		console.log('media_link:', media_link);
		console.log('description:', description);
		console.log('challenge_id:', challenge_id);
		console.log('user_id:', user_id);
         */
		try {
			const response = await participationCreation(media_link, description, user_id, challenge_id); //

			console.log('Response from participationCreation:', response);
			// Si la création est réussie, réinitialiser les champs et fermer le modal
			media_link = '';
			description = '';
			error = '';
			if (response && response.success) {
				const newParticipation = response.participation;

				newParticipation.user = {
					pseudo: participationCreator.pseudo,
					avatar: participationCreator.avatar
				};
				participations = [...participations, newParticipation]; // Ajout immédiat sans re-fetch
				error = '';
				success = 'Participation créée avec succès !';
				setTimeout(() => {
					success = '';
					showModal = false; // Fermer la modale après succès
				}, 3000); // Ferme la modale après 2 secondes
				await getParticipations(challenge_id); // Rafraîchir la liste des participations
			}
		} catch (err) {
			console.error('Erreur de création :', err);

			if (err.message?.includes('déjà participé')) {
				error = 'Vous avez déjà participé à ce challenge.';
			} else {
				error = 'Une erreur est survenue lors de la création de la participation.';
			}
			// error = "Une erreur est survenue lors de la création.";
		}
	};

	function openModal() {
		showModal = true;
	}
	/*
	$effect(() => {
		getChallengeDetails();
		getParticipationsList();
	});
	*/
</script>

<!-- Challenge details -->

{#if challenge && challengeCreator}
	<section class="challenge-details" aria-labelledby="challenge-details">
		<img src={`${challenge.image}`} alt={challenge.title} class="slide__image" />

		<div class="challenge-details__content">
			<h1 class="challenge-details__title">{challenge.title}</h1>
			<p class="challenge-details__description">Objectif : {challenge.description}</p>
			<p class="challenge-details__rules">Règle : {challenge.rules}</p>

			<div class="challenge_created-by">
				<p>Challenge created by</p>
				<div class="challenge__user-avatar" aria-hidden="true">{challengeCreator.avatar}</div>
				<p class="challenge__user-name">{challengeCreator.pseudo}</p>
			</div>

			<button class="btn btn--primary" onclick={openModal}> Participer au défi maintenant </button>
			{#if challenge.id}
				{console.log('✅ challenge est prêt', challenge)}

				<LikeItem classCSS="btn-from-challenge-page" {challenge} />
			{:else}
				<p>Chargement des Likes...</p>
			{/if}
		</div>
	</section>
{:else}
	<p>Challenge introuvable.</p>
{/if}

<!-- Participations Section -->
<section class="catalog" aria-labelledby="catalog-title">
	<h2>
		Voici les meilleures participations de la communauté ! <span
			>{participations.length} participations en cours…</span
		>
	</h2>

	<div class="catalog__grid" role="list">
		{#if participations.length > 0}
			{#each participations as participation}
				<ParticipationItem {participation} />
			{/each}
		{:else}
			<p>Aucune participation pour ce challenge pour le moment.</p>
		{/if}
	</div>

	<div class="load-more-container">
		<button class="btn secundary" id="load-more"> Voir plus de participations </button>
	</div>
</section>

<!-- Participation Creation Form -->

<Modal isOpen={showModal} close={() => (showModal = false)}>
	<h2>Participer au challenge</h2>

	{#if error}
		<div class="error">{error}</div>
	{/if}

	<ParticipationForm onSubmit={handleSubmitParticipation}>
		<input type="hidden" value={challenge_id} name="challengeId" />
		<input type="hidden" value={user_id} name="userId" />
		<Input
			id="media_link"
			type="text"
			label="Lien du média"
			placeholder="Entrez un lien"
			bind:value={media_link}
			required
			disabled={!isAuthenticated()}
		/>
		<Input
			id="description"
			type="text"
			label="Description"
			placeholder="Entrez une description"
			bind:value={description}
			required
			disabled={!isAuthenticated()}
		/>

		<Btn>Valider</Btn>
	</ParticipationForm>
	{#if !isAuthenticated()}
		<div class="already-account">
			<span>Pas encore de compte ? Créez en un simplement !</span>
			<a href="/auth/register">Cliquez ici</a>
		</div>
	{/if}
	{#if success}
		<p class="success">{success}</p>
	{/if}
</Modal>

<style>
	.error {
		color: #ff6b6b;
		text-align: center;
		margin-bottom: 1rem;
	}
	.already-account {
		margin-top: 1.5rem;
		text-align: center;
		font-size: 1.5rem;
	}
	.already-account a {
		color: #4f8cff;
		text-decoration: underline;
		margin-left: 0.3rem;
		cursor: pointer;
		transition: color 0.2s;
	}
	.already-account a:hover {
		color: #2563eb;
	}
	.success {
		color: #a3cca4;
		text-align: center;
		margin-bottom: 1rem;
	}
</style>
