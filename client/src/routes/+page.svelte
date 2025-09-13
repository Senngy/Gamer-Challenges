<script>
	// Svelte
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	// Components
	import CatalogItem from '$lib/components/ui/games/CatalogItem.svelte';
	import LeaderBoard from '$lib/components/LeaderBoard/LeaderBoard.svelte';

	let { data } = $props(); // Récupération des données passées par load() dans +page.server.js
	let { randomGames, topGames, leadersByChallenge, leadersByParticipation } = data;

	let slideIndex = $state(0); // Index en state pour effectuer le changement de slide
	let visibleCount = $state(4); // Nombre de jeux visibles dans le catalogue valeur initiale = 4

	// Fonction pour tronquer le texte à un certain nombre de mots et filtrer les balises HTML
	function truncateWords(text = '', max = 40) {
		const words = text.replace(/<[^>]*>/g, '').split(/\s+/);
		return words.slice(0, max).join(' ') + (words.length > max ? '…' : '');
	}

	// Fonctions pour naviguer pour leslider
	function next() {
		if (topGames?.length) slideIndex = (slideIndex + 1) % topGames.length;
	}
	function prev() {
		if (topGames?.length) slideIndex = (slideIndex - 1 + topGames.length) % topGames.length;
	}
	onMount(() => {
		// Animation d'apparition progressive des éléments
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-fade-in');
				}
			});
		});

		document
			.querySelectorAll('.homepage-intro, .block__content__populaires-top, .catalog')
			.forEach((item) => {
				observer.observe(item);
			});
	});
</script>

<svelte:head>
	<title>Accueil | GamerChallenges</title>
</svelte:head>

<!-- Introduction -->
<section class="homepage-intro" aria-labelledby="homepage-intro-title">
	<h1 id="homepage-intro-title" class="homepage-intro__title">
		🎮 Bienvenue sur Gamer Challenges 🎮
	</h1>
	<p class="homepage-intro__text">
		Tes exploits ne méritent pas de rester dans l’ombre... Rejoins Gamer Challenges : découvres et
		relève des défis, crées les tiens en 1 clic et flex tes skills en y participant. Prêt à défier
		la commu ?
	</p>
</section>

<!-- ========================== -->
<!-- Hero / Populaires -->
<!-- ========================== -->
<div class="block__content__populaires-top">
	{#if topGames?.length}
		<section
			class="popular-games"
			aria-labelledby="popular-games-title"
			tabindex="0"
			on:keydown={(e) => {
				if (e.key === 'ArrowRight') next();
				if (e.key === 'ArrowLeft') prev();
			}}
		>
			{#each topGames as game, i (game.id)}
				{#if i === slideIndex}
					<div class="popular-games__content slide active" data-index={i} transition:fade>
						<div class="popular-games__text">
							<span class="popular-games__tag">🔥 Populaires</span>
							<div class="glass__container">
								<h2 class="popular-games__title">{game.title}</h2>
								<p class="game-details__description popular-games__description">
									{truncateWords(game.description, 40)}
								</p>
								<a href={`/games/${game.id}`} class="btn btn--primary popular-games__btn">
									Voir le jeu et ses challenges
								</a>
							</div>
						</div>
						<img class="slide__image" src={game.image} alt={game.title} />
					</div>
				{/if}
			{/each}

			<nav class="popular-games__nav">
				<div class="popular-games__arrows">
					<button class="popular-games__arrow prev" on:click={prev}>‹</button>
					<button class="popular-games__arrow next" on:click={next}>›</button>
				</div>

				<div class="popular-games__pagination">{slideIndex + 1} / {topGames.length}</div>
			</nav>

			<!-- Pagination dots -->
			<div class="pagination-dots">
				{#each topGames as _, index}
					<span class:active={index === slideIndex} on:click={() => (slideIndex = index)}></span>
				{/each}
			</div>
		</section>
	{:else}
		<p>Chargement des jeux populaires…</p>
	{/if}

	<!-- ========================== -->
	<!-- Leaderboard -->
	<!-- ========================== -->

	<LeaderBoard {leadersByChallenge} {leadersByParticipation} />
</div>

<!-- ========================== -->
<!-- Catalog Section -->
<!-- ========================== -->
<section class="catalog" aria-labelledby="catalog-title">
	<h2 class="catalog__title" id="catalog-title">
		Flex sur ton jeu préféré et découvre d’autres terrains de jeu : défie la commu et partage tes
		exploits !
	</h2>
	<div class="catalog__grid" role="list">
		{#each randomGames.slice(0, visibleCount) as game}
			<CatalogItem {game} />
		{/each}
	</div>
	{#if visibleCount < randomGames.length}
		<div class="load-more-container">
			<button class="btn" id="load-more" on:click={() => (visibleCount += 8)}>
				Voir plus de jeux
			</button>
		</div>
	{/if}
</section>

<style>
	.homepage-intro,
	.block__content__populaires-top,
	.catalog {
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.6s ease-out,
			transform 0.6s ease-out;
	}

	.homepage-intro:global(.animate-fade-in) {
		opacity: 1;
		transform: translateY(0);
	}
	.block__content__populaires-top:global(.animate-fade-in) {
		opacity: 1;
		transform: translateY(0);
	}
	.catalog:global(.animate-fade-in) {
		opacity: 1;
		transform: translateY(0);
	}
	.btn:hover {
		background-color: var(--primary-color);
		box-shadow: 5px 5px 10px rgba(255, 79, 79, 0.548);
	}
	.popular-games__arrow {
		background-color: var(--btn-color);
	}
	.popular-games__arrow:hover {
		background-color: var(--primary-color);
	}
</style>
