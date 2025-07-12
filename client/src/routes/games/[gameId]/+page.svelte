<!-- /games/[gameId] +page.svelte -->
<script>
	import { goto } from '$app/navigation';
	import ChallengeItem from '$lib/components/ui/ChallengeItem.svelte';
	import ChallengeForm from '$lib/components/challenge/ChallengeForm.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';
	import Btn from '$lib/components/auth/Btn.svelte';
	import Input from '$lib/components/auth/Input.svelte';
	import { challengeCreation } from '$lib/services/challenge.service.js';
	import FilterText from '$lib/components/ui/FilterText.svelte';
	import { page } from '$app/state'
//import { invalidateAll } from '$app/navigation'; 

	//Récupération des données passées par load()
	//export let data;
	const { data } = $props();
    const { game, challenges } = data;
	// Debug
	//console.log('Game:', game);
	//console.log('Challenges:', challenges);

	
	// copie locale réactive pour la liste des challenges
  let localChallenges = $state([]);

    $effect(() => {
    localChallenges = [...data.challenges];
  });

  let las

  let showModal = $state(false);
  let title = $state(''); // Variable pour stocker le titre
  let description = $state(''); // Variable pour stocker la description
  let rules = $state(''); // Variable pour stocker les règles

    
  let game_by = $state(game.id); // ID du jeu depuis la donnée chargée
  let created_by = $state(challenges.created_by || 1); // ID du jeu associé aux challenges
	// Debug
	//console.log("game by :",game_by)
    //console.log("created by:",created_by)

  let error =$state('');
	let success = $state('');

	let visibleCount = $state(4);
	//let showModal = false;
	//let error = '';
	//const game_by = game.id; // ID du jeu depuis la donnée chargée
	//const created_by = 1; // TODO : remplacer par l'utilisateur réel connect


    const handleSubmitChallenge = async (e) => {
        console.log('handleSubmitChallenge called');
        e.preventDefault();

        if (!title.trim() || !description.trim() || !rules.trim()) {
            error = "Veuillez remplir tous les champs.";
            return;
        }
		if (title.length < 3 || description.length < 3 || rules.length < 3) {
			error = "Veuillez respecter les longueurs minimales des champs.";
			return;
		}
		if (title.length > 30 || description.length > 50 || rules.length > 100) {
			error = "Veuillez respecter les longueurs maximales des champs.";
			return;
		}
		if (/(?:[a-zA-Z])\1\1/.test(title) || /(?:[a-zA-Z])\1\1/.test(description) || /(?:[a-zA-Z])\1\1/.test(rules)) {
			error = "Aucun champ ne doit contenir plus de 3 lettres identiques à la suite.";
			return;
		}
         /*
        console.log('handleSubmitChallenge title:', title);
        console.log('handleSubmitChallengedescription:', description);
        console.log('handleSubmitChallenge rules:', rules);
        console.log('handleSubmitChallenge created_by:', created_by);
        console.log('handleSubmitChallenge game_by:', game_by);
		*/

        try {
           const challengeCreated = await challengeCreation(title, description, rules, created_by, game_by);
		   console.log('Response from challengeCreation called in handleSubmitChallenge:', challengeCreated);

           if (!challengeCreated) {
			   error = "Une erreur est survenue lors de la création du challenge.";
			   return;
            }
			// Mettre à jour la liste locale pour réafficher sans rechargement
            localChallenges = [challengeCreated, ...localChallenges];
		    error = '';
            //alert('Challenge créé avec succès !');
		    
			if(challengeCreated && challengeCreated.id) {
			   success = "Challenge créé avec succès !";
			    // Fermer la modale après 2 secondes
				setTimeout(() => {
				    success = '';
				    showModal = false; // Fermer la modale après succès
			    }, 3000); // Ferme la modale après 2 secondes
			}
			// Réinitialiser les champs du formulaire
			title = '';
			description = '';
			rules = '';
	
			// Optionnel : rediriger vers la page du challenge créé
			// Vous pouvez décommenter la ligne suivante si vous souhaitez rediriger
			if (challengeCreated && challengeCreated.id) {
				setTimeout(() => {
                    goto(`/challenges/${challengeCreated.id}`);
				}, 3500); // Redirige après 2.5 secondes
			}	
        } catch (e) {
            console.error('Erreur de création :', e);
            error = "Une erreur est survenue lors de la création.";
        }
    };


	// UI
	function openModal() {
      showModal = true;
    }
	function loadMore() {
		visibleCount += 4;
	}


</script>

<!-- Game details -->
{#if game}
	<section class="game-details" aria-labelledby="game-details">
		<img src={`${game.image}`} alt={game.title} class="slide__image" />

		<div class="game-details__content">
			<div class="game-details__platform">
				{#each game.platform?.split(',') ?? [] as platform}
					<span class="game-details__platform-item">{platform}</span>
				{/each}
			</div>

			<h1 class="game-details__title">{game.title}</h1>
			<FilterText text={game.description} max={200}/>

			<button class="btn btn--primary btn-game-card" on:click={openModal}>
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
		<span>{localChallenges.length} défis en cours…</span>
	</h2>

	<div class="catalog__grid" role="list">
		{#each localChallenges.slice(0, visibleCount) as challenge (challenge.id)}
			<ChallengeItem {challenge} role="button" tabindex="0" on:click={() => {goto(`/challenges/${challenge.id}`)}}/>
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
		<label for="rules">Règles</label>
        <textarea id="rules" class="rules" type="text" label="Règles" placeholder="Précisez les règles" bind:value={rules} required></textarea>
    
        <Btn>Valider</Btn>
    </ChallengeForm>
    <div class="already-account">
        <span>Pas encore de compte ? Créez en un simplement !</span>
        <a href="/auth/signup">Cliquez ici</a>
    </div>
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
	.success {
		color: #a3cca4;
		text-align: center;
		margin-bottom: 1rem;
	}
	.rules {
	    width: 100%;
        padding: 10px 20px;
        border: none;
        border-radius: 25px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        font-size: 14px;
	}
	.rules::placeholder {
        color: rgba(255, 255, 255, 0.6); 
		font-family: 'Roboto', sans-serif;
    }

	label {
        font-weight: bold;
        margin-top: 0.3rem;
        display: block;
        padding-left: 2rem;
      /* or text-align: center; */
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
	.btn-game-card {
		margin-top: 1rem;
	}
</style>
