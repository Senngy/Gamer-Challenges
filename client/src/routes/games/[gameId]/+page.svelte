<script>
    import ChallengeItem from '$lib/components/ui/ChallengeItem.svelte';
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
        Valorant est un jeu de tir tactique...
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