<script>
	import CatalogItem from '$lib/components/ui/games/CatalogItem.svelte';
	import { onMount } from 'svelte';

	const { data } = $props();
	const { games } = data;

	let visibleCount = $state(4);

	onMount(() => {
		// Animation d'apparition progressive des éléments
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-fade-in');
				}
			});
		});

		document.querySelectorAll('h1, .hero-subtitle, .catalog').forEach((item) => {
			observer.observe(item);
		});
	});
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
			<button class="btn" id="load-more" onclick={() => (visibleCount += 8)}>
				Voir plus de jeux
			</button>
		</div>
	{/if}
	
</section>

<style>
	h1, .hero-subtitle, .catalog {
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.5s ease-out, transform 0.5s ease-out;
		}
		
	h1:global(.animate-fade-in) {
		opacity: 1;
		transform: translateY(0);
	}
	.hero-subtitle:global(.animate-fade-in) {
		opacity: 1;
		transform: translateY(0);
	}
	.catalog:global(.animate-fade-in) {
		opacity: 1;
		transform: translateY(0);
	}
	
</style>
