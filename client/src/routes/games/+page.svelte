<script>
	import CatalogItem from '$lib/components/ui/CatalogItem.svelte';
	// export let data;
	// let games = data.games;
	const { data } = $props();
	const { games } = data;

	let visibleCount = $state(6);
</script>

<section class="catalog" aria-labelledby="catalog-title">
	<h1 class="catalog__title">Choisissez un jeu et lancez vous dans un défi !</h1>
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
