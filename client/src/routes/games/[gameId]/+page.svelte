<script>
  import ChallengeItem from '$lib/components/ui/ChallengeItem.svelte';
  export let data;
  const { game, challenges } = data;

  let visibleCount = 4; // nombre de challenges à afficher
  const increment = 4;

  function loadMore() {
    visibleCount += increment;
  }
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

      <button class="btn btn--primary">
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
