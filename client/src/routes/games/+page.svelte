<script>
	import CatalogItem from '$lib/components/ui/CatalogItem.svelte';

	// export let data;
	// let games = data.games;
	const { data } = $props();
	const { games } = data;

	let visibleCount = $state(6);
</script>

<svelte:head>
  <title>Jeux - GamerChallenges</title>
  <meta name="description" content="Découvrez tous les jeux disponibles sur GamerChallenges et explorez les défis gaming de la communauté." />
</svelte:head>

<div class="hero-section">
  <h1>Catalogue de jeux</h1>
  <p class="hero-subtitle">Choisissez un jeu et lancez vous dans un challenge !</p>
</div>
<section class="catalog" aria-labelledby="catalog-title">
	<!-- <h1 class="catalog__title">Choisissez un jeu et lancez vous dans un challenge !</h1> -->
	<div class="catalog__grid" role="list">
		{#each games.slice(0, visibleCount) as game}
			<CatalogItem {game} />
		{/each}
	</div>
	{#if visibleCount < games.length}
		<div class="load-more-container">
			<button class="btn" id="load-more" onclick={() => (visibleCount += 6)}>
				Voir plus de jeux
			</button>
		</div>
	{/if}
</section>

<style>
	.hero-section {
		text-align: center;
		margin-bottom: 3rem;
	}
	.hero-section h1 {
		font-size: 3rem;
		font-weight: 700;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 1rem;
	}
	.hero-subtitle {
		font-size: 1rem;
		margin: 0 auto;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
</style>
