<script>
    import ChallengeItem from '$lib/components/ui/ChallengeItem.svelte';
</script>

<!-- Game details -->
<section class="game-details" aria-labelledby="game-details">

    <img src="/images/background-valorant.webp" alt="Valorant" class="slide__image" />

    <div class="game-details__content slide">
        <h1 class="game-details__title">VALORANT</h1>
        <p class="game-details__description">
        Valorant est un jeu de tir tactique...
        </p>
        <div class="game-details__platform">
            <span class="catalog__tag">PC</span>
        </div>
        <button class="btn btn--primary">Lancer un défi !</button>
    </div>

</section>


<!-- Challenges Section -->
<section class="catalog" aria-labelledby="catalog-title">
    <h2>Lancez vous dans un défi !</h2>
    <div class="catalog__grid" role="list">   

        <ChallengeItem />
        <ChallengeItem />
        <ChallengeItem />
        <ChallengeItem />
        <ChallengeItem />
        <ChallengeItem />

    </div>

    <div class="load-more-container">
        <button class="btn" id="load-more">
            Voir plus de challenges
        </button>
    </div>
</section>