<script>
	import CatalogItem from '$lib/components/ui/CatalogItem.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let games = [];
	let randomGames = [];

	let topGames = [];
	let slideIndex = 0;

	onMount(async () => {
		try {
			const resGames = await fetch('http://localhost:3000/games');
			games = await resGames.json();
			randomGames =
				games.length >= 4 ? [...games].sort(() => Math.random() - 0.5).slice(0, 4) : games;

			const resTop = await fetch('http://localhost:3000/games/top');
			topGames = await resTop.json();
			console.log('Top games:', topGames); // Debug log
		} catch (err) {
			console.error('Erreur chargement jeux :', err);
		}
	});

	function truncateWords(text = '', max = 40) {
		const words = text.replace(/<[^>]*>/g, '').split(/\s+/);
		return words.slice(0, max).join(' ') + (words.length > max ? '…' : '');
	}

	function next() {
		if (topGames.length) slideIndex = (slideIndex + 1) % topGames.length;
	}

	function prev() {
		if (topGames.length) slideIndex = (slideIndex - 1 + topGames.length) % topGames.length;
	}
</script>

<!-- ========================== -->
<!-- Hero / Populaires -->
<!-- ========================== -->
<div class="block__content__populaires-top">
	{#if topGames.length}
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
							<p class="popular-games__description">{truncateWords(game.description, 40)}</p>
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
	<aside class="leaderboard" aria-labelledby="leaderboard-title">
		<div>
			<h2 class="leaderboard__title" id="leaderboard-title">Top challengers 🏆</h2>
			<span class="leaderboard__highlight" aria-hidden="true">#Gamerchallenges</span>
		</div>

		{#each [1, 2, 3] as rank}
			<div
				class="leaderboard__item"
				role="listitem"
				aria-label={`Joueur ${rank} : Babyloto, 12 likes, ${rank}e place`}
			>
				<div class="leaderboard__player-avatar" aria-hidden="true">B</div>
				<div class="leaderboard__player-info">
					<h3 class="leaderboard__player-name">Babyloto</h3>
					<div class="leaderboard__player-stats">
						<span class="leaderboard__player-stat-heart" aria-hidden="true">❤️</span>
						<span class="leaderboard__player-stat-likes">12 likes</span>
					</div>
				</div>
				<div class="leaderboard__player-level" aria-label={`${rank}e place`}>
					{rank === 1 ? '🏆' : rank === 2 ? '🥈' : '🥉'}
					{rank}
				</div>
			</div>

			{#if rank !== 3}
				<span class="leaderboard__divider" role="separator" aria-hidden="true"></span>
			{/if}
		{/each}
	</aside>
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
