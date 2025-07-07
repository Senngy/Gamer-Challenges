<script>
    import ParticipationItem from '$lib/components/ui/ParticipationItem.svelte';
</script>

<!-- Challenge details -->
<section class="challenge-details" aria-labelledby="challenge-details">

    <img src="/images/logo-valorant.png" alt="Valorant" class="slide__image" />

    <div class="challenge-details__content">
        <h1 class="challenge-details__title">#challengeTitle</h1>
        <p class="challenge-details__description">#challengeDescription</p>
        <p class="challenge-details__rules">#challengeRules...</p>

        <button class="btn btn--primary">Participer au défi maintenant</button>
    </div>

</section>


<!-- Participations Section -->
<section class="catalog" aria-labelledby="catalog-title">

    <h2>Voici les meilleures participations de la communauté ! <span>256 participations en cours…</span></h2>

    <div class="catalog__grid" role="list">

        <ParticipationItem />
        <ParticipationItem />
        <ParticipationItem />
        <ParticipationItem />
        <ParticipationItem />
        <ParticipationItem />

    </div>

    <div class="load-more-container">
        <button class="btn secundary" id="load-more">
            Voir plus de participations
        </button>
    </div>
</section>