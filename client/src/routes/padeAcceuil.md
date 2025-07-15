<script>
	import CatalogItem from '$lib/components/ui/CatalogItem.svelte';
	import { onMount } from 'svelte';

	/* ----------  Données catalogue  ---------- */
	let games = [];
	let randomGames = [];

	/* ----------  Données populaires  ---------- */
	let topGames = []; // tableau des 3 jeux + participations
	let slideIndex = 0; // index du jeu affiché dans le slider

	onMount(async () => {
		try {
			/* 1. Jeux du catalogue */
			const resGames = await fetch('http://localhost:3000/games');
			games = await resGames.json();
			randomGames =
				games.length >= 4 ? [...games].sort(() => Math.random() - 0.5).slice(0, 4) : games;

			/* 2. Top 3 jeux populaires */
			const resTop = await fetch('http://localhost:3000/games/top');
			topGames = await resTop.json();
		} catch (err) {
			console.error('Erreur chargement jeux :', err);
		}
	});

	/* ----------  Utils  ---------- */
	// Fonction utilitaire pour tronquer le texte à un nombre de mots maximum
	// (utile pour les descriptions de jeux)
	function truncateWords(text = '', max = 40) {
		const words = text.replace(/<[^>]*>/g, '').split(/\s+/);
		return words.slice(0, max).join(' ') + (words.length > max ? '…' : '');
	}

	//passé a la slide suivante ou précédente
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

{#if topGames.length}
<section class="popular-games" aria-labelledby="popular-games-title">
{#each topGames as game, i}
<div
				class="popular-games__content slide {i === slideIndex ? 'active' : 'hidden'}"
				data-index={i}
			>
<div class="popular-games__text">
<span class="popular-games__tag">🔥 Populaires</span>
<h2 class="popular-games__title">{game.title}</h2>
<p class="popular-games__description">{truncateWords(game.description, 40)}</p>
<a href={`/games/${game.id}`} class="btn btn--primary popular-games**btn">
Voir le jeu et ses challenges
</a>
</div>
<img class="slide**image" src={game.image} alt={game.title} />
</div>
{/each}

    	<nav class="popular-games__nav">
    		<button class="popular-games__arrow prev" on:click={prev}>‹</button>
    		<button class="popular-games__arrow next" on:click={next}>›</button>
    		<div class="popular-games__pagination">{slideIndex + 1} / {topGames.length}</div>
    	</nav>
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

    <!-- Player 1 -->
    <div
    	class="leaderboard__item"
    	role="listitem"
    	aria-label="Joueur 1 : Babyloto, 12 likes, 1er place"
    >
    	<div class="leaderboard__player-avatar" aria-hidden="true">B</div>
    	<div class="leaderboard__player-info">
    		<h3 class="leaderboard__player-name">Babyloto</h3>
    		<div class="leaderboard__player-stats">
    			<span class="leaderboard__player-stat-heart" aria-hidden="true">❤️</span>
    			<span class="leaderboard__player-stat-likes">12 likes</span>
    		</div>
    	</div>
    	<div class="leaderboard__player-level" aria-label="1ère place">🏆 1</div>
    </div>

    <span class="leaderboard__divider" role="separator" aria-hidden="true"></span>

    <!-- Player 2 -->
    <div
    	class="leaderboard__item"
    	role="listitem"
    	aria-label="Joueur 2 : Babyloto, 12 likes, 2ème place"
    >
    	<div class="leaderboard__player-avatar" aria-hidden="true">B</div>
    	<div class="leaderboard__player-info">
    		<h3 class="leaderboard__player-name">Babyloto</h3>
    		<div class="leaderboard__player-stats">
    			<span class="leaderboard__player-stat-heart" aria-hidden="true">❤️</span>
    			<span class="leaderboard__player-stat-likes">12 likes</span>
    		</div>
    	</div>
    	<div class="leaderboard__player-level" aria-label="2ème place">🥈 2</div>
    </div>

    <span class="leaderboard__divider" role="separator" aria-hidden="true"></span>

    <!-- Player 3 -->
    <div
    	class="leaderboard__item"
    	role="listitem"
    	aria-label="Joueur 3 : Babyloto, 12 likes, 3ème place"
    >
    	<div class="leaderboard__player-avatar" aria-hidden="true">B</div>
    	<div class="leaderboard__player-info">
    		<h3 class="leaderboard__player-name">Babyloto</h3>
    		<div class="leaderboard__player-stats">
    			<span class="leaderboard__player-stat-heart" aria-hidden="true">❤️</span>
    			<span class="leaderboard__player-stat-likes">12 likes</span>
    		</div>
    	</div>
    	<div class="leaderboard__player-level" aria-label="3ème place">🥉 3</div>
    </div>

</aside>

<!-- ========================== -->
<!-- Catalog Section -->
<!-- ========================== -->
<section class="catalog" aria-labelledby="catalog-title">
	<h2 class="catalog__title" id="catalog-title">Également sur notre catalogue</h2>
	<div class="catalog__grid" role="list">
		{#each randomGames as game}
			<CatalogItem {game} />
		{/each}
	</div>
</section>

<style>
	/* n’afficher que la slide active */
	.popular-games__content {
		display: none;
	}
	.popular-games__content.active {
		display: flex;
	}

	.popular-games__description {
		text-shadow:
			-1px -1px 0 #000,
			1px -1px 0 #000,
			-1px 1px 0 #000,
			1px 1px 0 #000;
	}
</style>
