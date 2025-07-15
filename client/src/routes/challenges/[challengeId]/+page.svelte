<script>
	import ParticipationItem from '$lib/components/ui/ParticipationItem.svelte';
	import Btn from '$lib/components/auth/Btn.svelte';
	import Input from '$lib/components/auth/Input.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';
	import ParticipationForm from '$lib/components/participation/ParticipationForm.svelte';
	import FilterText from '$lib/components/ui/FilterText.svelte';
	import LikeItem from '$lib/components/ui/LikeItem.svelte';
	import { getChallenge } from '$lib/services/challenge.service.js';
	import { getParticipations } from '$lib/services/participation.service.js';
	import { participationCreation } from '$lib/services/participation.service.js';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';

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

	let game = $state({
		id: '',
		title: '',
		image: ''
	});

	let challengeCreator = $state({
		pseudo: '',
		avatar: ''
	});

	

	let participations = $state([]); // Initialisation de la liste des participations
	let showModal = $state(false); // État pour contrôler l'affichage du modal
	let error = $state(''); // État pour les messages d'erreur
	let success = $state(''); // État pour les messages de succès
	let media_link = $state(''); // État pour le lien du média
	let description = $state(''); // État pour la description de la participation
	let user_id = 3; // Remplacez par l'ID de l'utilisateur connecté
	// console.log(`user_id: ${user_id}`)

	onMount(async () => {
		// Utilisation de onMount pour récupérer les données du challenge lors du chargement du composant
		// Récupération des détails du challenge
		try {
			const challengeDetails = await getChallenge(challenge_id); // Appel à la fonction pour récupérer les détails du challenge
			if (!challengeDetails) throw new Error('Pas de challenge trouvé');

			const { id, title, description, rules, created_by, game_by } = challengeDetails; // Récupération des détails du challenge
			game = await getGameInfo(game_by); // Appel à la fonction pour récupérer l'image du jeu associé au challenge
			const { pseudo, avatar } = await getUserInfo(created_by); // Récupération des informations de l'utilisateur connecté
			console.log('onMount pseudo :', pseudo);
			console.log('onMount avatar :', avatar);
			// remplissage de l'objet challenge avec les données récupérées
			challenge = { id, title, description, rules, created_by, game_by, image }; // ✅ Injecte ici l’image récupérée
			challengeCreator = { pseudo, avatar }; // remplissage de l'objet challengeCreator avec les données de l'utilisateur
			await getParticipationsList(); // Récupération des participations du challenge
		} catch (err) {
			console.error('Erreur récupération challenge :', err);
		}
	});

	async function getGameInfo(gameId) {
		// Fonction pour récupérer l'image du jeu associé au challenge
		try {
			const res = await fetch(`http://localhost:3000/games/${gameId}`);
			const game = await res.json();
			console.log('Game info récupéré :', game);
			return game;
		} catch (err) {
			console.error('Erreur getGameImage :', err);
			return null;
		}
	}

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

	const getChallengeDetails = async () => {
		// Fonction pour récupérer les détails du challenge
		try {
			const challengeDetails = await getChallenge(challenge_id);
			console.log('Données du challenge récupérées :', challengeDetails);

			if (!challengeDetails) {
				throw new Error('Réponse inattendue : pas de détails disponibles');
			}

			const { id, title, description, rules, created_by, game_by } = challengeDetails;

			challenge = {
				id: challengeDetails.id,
				title: challengeDetails.title,
				description: challengeDetails.description,
				rules: challengeDetails.rules,
				created_by: challengeDetails.created_by,
				game_by: challengeDetails.game_by
			};
			console.log('CHALLENGE', challenge);
			return getGameImage(challenge.game_by);
		} catch (error) {
			console.error('Erreur lors de la récupération des informations du challenge :', error);
		}
	};

	const getParticipationsList = async () => {
		try {
			const participationsList = await getParticipations(challenge_id);
			console.log('Liste des participations du challenge récupérées :', participationsList);

			if (!participationsList) {
				throw new Error('Réponse inattendue : pas de participations disponibles');
			}

			participations = participationsList;
		} catch (error) {
			console.error('Erreur lors de la récupération des participations du challenge :', error);
		}
	};

	const handleSubmitParticipation = async (e) => {
		console.log('handleSubmitParticipation called');
		e.preventDefault();

		if (!media_link.trim() || !description.trim()) {
			error = 'Veuillez remplir tous les champs.';
			return;
		}

		console.log('media_link:', media_link);
		console.log('description:', description);
		console.log('challenge_id:', challenge_id);
		console.log('user_id:', user_id);

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
					pseudo: challengeCreator.pseudo,
					avatar: challengeCreator.avatar
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

	$effect(() => {
		getChallengeDetails();
		getParticipationsList();
	});
</script>

<section class="intro">

<!-- Game infos -->
<section class="game-info">

	<div class="game-info__bloc">
		<img class="game-info__image" src={`${game.image}`} alt={game.title}/>
	</div>

	<div class="game-info__bloc">
		<p>Challenge pour le jeu</p>
		<p class="game-info__title">"{game.title}"</p>
	</div>
	
</section>

<!-- Challenge details -->

{#if challenge}
	<section class="challenge-details" aria-labelledby="challenge-details">

		<div class="challenge-details__content">

			{#if challenge.id}
				{console.log('✅ challenge est prêt', challenge)}
				<LikeItem classCSS="btn-from-challenge-page" {challenge} />	
			{:else}
				<p>Chargement des Likes...</p>
			{/if}


			<h1 class="challenge-details__title">{challenge.title}</h1>
			<p class="challenge-details__description">Objectif : {challenge.description}</p>
			<p class="challenge-details__rules">Règle : {challenge.rules}</p>

			<div class="challenge_created-by">
				<p>Challenge créé par</p>
				<div class="challenge__user-avatar" aria-hidden="true">{challengeCreator.avatar}</div>
				<p class="challenge__user-name">{challengeCreator.pseudo}</p>
			</div>

			<button class="btn btn--primary" onclick={openModal}> Participer au défi maintenant </button>
			
		</div>
	</section>
{:else}
	<p>Challenge introuvable.</p>
{/if}

</section>

<!-- Participations Section -->
<section class="catalog" aria-labelledby="catalog-title">
	
	{#if participations.length > 0}

	<p class="catalog-intro-text">
		Déjà 
		<span>{participations.length}</span>
		{#if participations.length === 1}
			participation !
		{:else}
			participations !
		{/if}
	</p>

	<div class="catalog__grid" role="list">
		{#each participations as participation}
			<ParticipationItem {participation} />
		{/each}
	</div>

	{:else}
		<p>Aucune participation pour ce challenge pour le moment.</p>
	{/if}

	<!-- <div class="load-more-container">
		<button class="btn secundary" id="load-more">
			Voir plus de participations
		</button>
	</div> -->
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
		/>
		<Input
			id="description"
			type="text"
			label="Description"
			placeholder="Entrez une description"
			bind:value={description}
			required
		/>

		<Btn>Valider</Btn>
	</ParticipationForm>
	<div class="already-account">
		<span>Pas encore de compte ? Créez en un simplement !</span>
		<a href="/auth/register">Cliquez ici</a>
	</div>
	{#if success}
		<p class="success">{success}</p>
	{/if}
</Modal>

<style>
	.intro {
		display: flex;
		flex-direction: column;

		border-bottom: 1px solid rgba(255, 255, 255, 0.3);
	}
	.game-info {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 1em;
		padding: 1em;
		
		background: linear-gradient(to bottom, #0C0E0F 0%, #8B1E1E 100%);
	}
	.game-info__bloc {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
	}
	.game-info__title {
		color: #eee;
		/* color: #8B1E1E; */
		font-weight: bold;
		margin: 0.5em 0;
		font-size: 1.2em;
	}
	.game-info__image {
		width: auto;
		height: auto;
		border-radius: 5%;
		object-fit: cover;
		max-height: 100px;
	}

	/* Pour les écrans ≥ 768px (tablettes et plus) */
	@media (min-width: 768px) {
		.intro {
			flex-direction: row;
		}
		.game-info {
			flex-direction: column;
		}
		.game-info__bloc {
			align-items: center;
			text-align: center;
		}
	}

	.catalog-intro-text {
		font-size: 1.2em;
		margin-bottom: 1em;
	}

	.error {
		color: #ff6b6b;
		text-align: center;
		margin-bottom: 1rem;
	}
	.already-account {
		margin-top: 1.5rem;
		text-align: center;
		font-size: 1rem;
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
