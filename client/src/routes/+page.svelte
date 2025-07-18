<script>
	import CatalogItem from '$lib/components/ui/CatalogItem.svelte';
	import { fade } from 'svelte/transition';
	import LeaderBoard from '$lib/components/LeaderBoard/LeaderBoard.svelte';

	let { data } = $props();
	const { randomGames, topGames, leadersByChallenge, leadersByParticipation } = data;
	
	let slideIndex = 0;


	function truncateWords(text = '', max = 40) {
		const words = text.replace(/<[^>]*>/g, '').split(/\s+/);
		return words.slice(0, max).join(' ') + (words.length > max ? '…' : '');
	}

	function next() {
		if (topGames?.length) slideIndex = (slideIndex + 1) % topGames.length;
	}

	function prev() {
		if (topGames?.length) slideIndex = (slideIndex - 1 + topGames.length) % topGames.length;
	}

</script>

<svelte:head>
  <title>Accueil | GamerChallenges</title>
</svelte:head>

<!-- Introduction -->
<section class="homepage-intro" aria-labelledby="homepage-intro-title">
	<h1 id="homepage-intro-title" class="homepage-intro__title">Bienvenue sur Gamer Challenges</h1>
	<p class="homepage-intro__text">
		Rejoins les joueuses et joueurs du monde entier ! Parcours notre sélection de défis, crée les
		tiens en un clic et affronte la communauté dans une ambiance aussi fun que compétitive.
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
							<h2 class="popular-games__title">{game.title}</h2>
							<p class="game-details__description popular-games__description">{truncateWords(game.description, 40)}</p>
							<a href={`/games/${game.id}`} class="btn btn--primary popular-games__btn">
								Voir le jeu et ses challenges
							</a>
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
		Découvrez les autres jeux disponibles ou vous pouvez participez a votre propre challenge ou defier la communitaie.
	</h2>
	<div class="catalog__grid" role="list">
		{#each randomGames as game (game.id)}
			<CatalogItem {game} />
		{/each}
	</div>
</section>
