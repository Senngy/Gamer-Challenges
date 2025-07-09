<script>
	import { goto } from '$app/navigation';

	import ChallengeItem from '$lib/components/ui/ChallengeItem.svelte';
	import ChallengeForm from '$lib/components/challenge/ChallengeForm.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';
	import Btn from '$lib/components/auth/Btn.svelte';
	import Input from '$lib/components/auth/Input.svelte';

	import { challengeCreation } from '$lib/services/challenge.service.js';

	// Récupération des données passées par load()
	export let data;
	const { game, challenges } = data;

	// Debug
	console.log('Game:', game);
	console.log('Challenges:', challenges);

    let showModal = $state(false);

    function openModal() {
      showModal = true;
    }

    import ChallengeForm from '$lib/components/challenge/ChallengeForm.svelte';

    import { challengeCreation } from "$lib/services/challenge.service.js";
    import { goto } from "$app/navigation";

    let title = $state(''); // Variable pour stocker le titre
    let description = $state(''); // Variable pour stocker la description
    let rules = $state(''); // Variable pour stocker les règles

    let game_by = $state($page.params.gameId); // Variable pour stocker l'ID du jeu
    console.log(game_by)
    let created_by = 1;
    console.log(created_by)

    let error =$state('');

    const handleSubmitChallenge = async (e) => {
        console.log('handleSubmitChallenge called');
        e.preventDefault();

        if (!title.trim() || !description.trim() || !rules.trim()) {
            error = "Veuillez remplir tous les champs.";
            return;
        }

        console.log('title:', title);
        console.log('description:', description);
        console.log('rules:', rules);
        console.log('created_by:', created_by);
        console.log('game_by:', game_by);

        try {
        const response = await challengeCreation(title, description, rules, created_by, game_by);

        if (response && response.success) {
            error = '';
            alert('Challenge créé avec succès !');
            goto(`/challenges/${response.challenge.id}`);
        } else {
            error = "Erreur : la création du challenge n'a pas été confirmée.";
        }
        } catch (e) {
            console.error('Erreur de création :', e);
            error = "Une erreur est survenue lors de la création.";
        }
    };

	// UI
	let visibleCount = 4;
	let showModal = false;
	let error = '';


	const game_by = game.id; // ID du jeu depuis la donnée chargée
	const created_by = 1; // TODO : remplacer par l'utilisateur réel connecté

	function loadMore() {
		visibleCount += 4;
	}

	function openModal() {
		showModal = true;
	}

	const handleSubmitChallenge = async (e) => {
		e.preventDefault();

		if (!title.trim() || !description.trim() || !rules.trim()) {
			error = 'Veuillez remplir tous les champs.';
			return;
		}

		try {
			const response = await challengeCreation(title, description, rules, created_by, game_by);

			if (response && response.success) {
				error = '';
				alert('Challenge créé avec succès !');
				goto('/challenges');
			} else {
				error = "Erreur : la création du challenge n'a pas été confirmée.";
			}
		} catch (e) {
			console.error('Erreur de création :', e);
			error = 'Une erreur est survenue lors de la création.';
		}
	};
</script>

<!-- Game details -->
{#if game}
	<section class="game-details" aria-labelledby="game-details">
		<img src={`/images/${game.image}`} alt={game.title} class="slide__image" />

		<div class="game-details__content">
			<div class="game-details__platform">
				{#each game.platform?.split(',') ?? [] as platform}
					<span class="game-details__platform-item">{platform}</span>
				{/each}
			</div>

			<h1 class="game-details__title">{game.title}</h1>
			<p class="game-details__description">{game.description}</p>

			<button class="btn btn--primary" on:click={openModal}>
				Lancer un nouveau défi maintenant
			</button>
		</div>
	</section>
{:else}
	<p>Jeu introuvable.</p>
{/if}

<!-- Challenges Section -->
<section class="catalog" aria-labelledby="catalog-title">
	<h2>
		Participer à un défi créé par la communauté !
		<span>{challenges.length} défis en cours…</span>
	</h2>

	<div class="catalog__grid" role="list">
		{#each challenges.slice(0, visibleCount) as challenge (challenge.id)}
			<ChallengeItem {challenge} />
		{/each}
	</div>

	{#if visibleCount < challenges.length}
		<div class="load-more-container">
			<button
				class="btn secundary"
				id="load-more"
				on:click={loadMore}
				disabled={visibleCount >= challenges.length}
			>
				Voir plus de challenges
			</button>
		</div>
	{:else}
		<p class="no-more">Tous les challenges ont été chargés ✅</p>
	{/if}
</section>

<!-- Challenge Creation Form -->

<Modal isOpen={showModal} close={() => showModal = false}>

    <h2>Créer un challenge</h2>

    {#if error}
        <div class="error">{error}</div>
    {/if}
    
    <ChallengeForm onSubmit={handleSubmitChallenge}>
        <input type="hidden" value={game_by} name="gameId" />
        <Input id="title" type="text" label="Titre" placeholder="Entrez un titre" bind:value={title} required />
        <Input id="description" type="text" label="Description" placeholder="Entrez une description" bind:value={description} required />
        <Input id="rules" type="text" label="Règles" placeholder="Précisez les règles" bind:value={rules} required />
    
        <Btn>Valider</Btn>
    </ChallengeForm>
    <div class="already-account">
        <span>Pas encore de compte ? Créez en un simplement !</span>
        <a href="/auth/signup">Cliquez ici</a>
    </div>

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
</style>
