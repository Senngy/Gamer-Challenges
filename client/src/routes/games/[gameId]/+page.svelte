<script>
    import ChallengeItem from '$lib/components/ui/ChallengeItem.svelte';

    /* Challenge Creation */

    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';

    import Btn from '$lib/components/auth/Btn.svelte';
    import Input from "$lib/components/auth/Input.svelte";
    import AuthContainer from '$lib/components/auth/AuthContainer.svelte';
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
    // let created_by = $state(localStorage.getItem("userId") || ''); // Variable pour stocker l'ID de l'utilisateur

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
            goto('/challenges');
        } else {
            error = "Erreur : la création du challenge n'a pas été confirmée.";
        }
        } catch (e) {
            console.error('Erreur de création :', e);
            error = "Une erreur est survenue lors de la création.";
        }
    };

</script>

<!-- Game details -->
<section class="game-details" aria-labelledby="game-details">

    <img src="/images/background-valorant.webp" alt="Valorant" class="slide__image" />

    <div class="game-details__content">
        <div class="game-details__platform">
            <span class="game-details__platform-item">PC</span>
            <span class="game-details__platform-item">Mac</span>
            <span class="game-details__platform-item">Linux</span>
        </div>
        <h1 class="game-details__title">VALORANT</h1>
        <p class="game-details__description">
        Valorant est un jeu de tir tactique à la première personne développé par Riot Games, où deux équipes de cinq joueurs s’affrontent dans des parties stratégiques mêlant précision, coordination et compétences spéciales. Chaque joueur incarne un “agent” doté de capacités uniques, ajoutant une dimension héroïque au gameplay classique du genre.
        </p>
        <button class="btn btn--primary">Lancer un nouveau défi maintenant</button>
    </div>

</section>


<!-- Challenges Section -->
<section class="catalog" aria-labelledby="catalog-title">

    <h2>Participer à un défi créé par la communauté ! <span>256 défis en cours…</span></h2>

    <div class="catalog__grid" role="list">   

        <ChallengeItem />
        <ChallengeItem />
        <ChallengeItem />
        <ChallengeItem />
        <ChallengeItem />
        <ChallengeItem />

    </div>

    <div class="load-more-container">
        <button class="btn secundary" id="load-more">
            Voir plus de challenges
        </button>
    </div>
</section>


<!-- Challenge Creation Form -->

<AuthContainer title="Créer un challenge">

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

</AuthContainer>


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