<!-- Header.svelte -->
<script>
	import { authStore, getAuth, isAuthenticated, clearAuth } from '$lib/store/authStore.svelte';
	import { getUserById } from '$lib/services/user.service';
	import Btn from '$lib/components/me/Btn.svelte';
	import { goto } from '$app/navigation';
	import { logout } from '$lib/services/auth.service.js';
	import { onMount } from 'svelte';
	import { searchGames } from '$lib/services/game.service.js';
	let userInfo = $state({});
	let userInfoJSON = null;
	let userAvatar = null;
	let searchQuery = $state('');
	let searchResults = $state([]);

	onMount(async () => {
		try {
			userInfoJSON = localStorage.getItem('user');
			userInfo = JSON.parse(userInfoJSON);
			//console.log("userInfo", userInfo);
			const user = await getUserById(userInfo.id);
			// console.log("Utilisateur récupéré :", user);
			userAvatar = user.avatar;
			// console.log("Avatar récupéré :", userAvatar);
		} catch (error) {
			console.error("Erreur lors de la récupération de l'avatar :", error);
		}
	});

	$effect(() => {
		//
		getAuth(); //
	});

	$effect(async () => {
		onSearch();
	});
	const onSearch = async () => {
		if (searchQuery.trim() === '') {
			// Si la requête de recherche est vide, on vide les résultats
			searchResults = []; // On vide les résultats de la recherche
			return;
		}
		try {
			const results = await searchGames(searchQuery);
			searchResults = results;
		} catch (error) {
			console.error('Erreur lors de la recherche :', error);
			searchResults = [];
		}
		searchResults;
	};

	async function cleanLogout() {
		// Fonction de déconnexion
		// Logique de déconnexion ici
		try {
			await logout(); // Appel de la fonction de déconnexion
			clearAuth(); // Nettoyage du store d'authentification
			// Destruction du token d'authentification dans le back
			console.log('Déconnexion réussie');
			alert('Déconnexion !');
		} catch (error) {
			console.error('Erreur lors de la déconnexion :', error);
		}
		// Nettoyer le localStorage
		// Mettre à jour le store d'authentificationé
	}
	function redirect(url) {
		// Redirige vers une autre page
		goto(url);
		//console.log("redirect", url)
		// window.location.reload();  // force le reload complet après la redirection SPA
	}
	function redirectSearch(url) {
		searchQuery = '';
		searchResults = [];
		goto(url, { invalidateAll: true });
		// console.log("redirectSearch", url)
		window.location.href = url;
	}
</script>

<header class="header" aria-label="En-tête du site Gamer Challenge">
	<!-- Logo du site -->
	<div class="header__logo" aria-label="Logo Gamer Challenge">GC</div>

	<!-- Barre de recherche -->
	<div class="header__search-bar" aria-label="Barre de recherche">
		<form on:submit|preventDefault={onSearch}>
			<label for="search" class="visually-hidden">Rechercher un jeu</label>
			<input
				type="search"
				id="search"
				name="search"
				class="search-input"
				bind:value={searchQuery}
				placeholder="Rechercher votre jeu... 🔍"
				aria-label="Rechercher un jeu"
			/>
		</form>
		{#if searchResults.length > 0}
			<ul class="search-results">
				{#each searchResults as game}
					<li class="result-game">
						<button
							type="button"
							class="btn-result"
							on:click={() => redirectSearch(`/games/${game.id}`)}>{game.title}</button
						>
					</li>
				{/each}
			</ul>
		{:else if searchQuery.trim() !== ''}
			<p class="no-result">Aucun résultat trouvé</p>
		{/if}
	</div>

	<!-- Bouton menu burger -->
	<button
		class="burger"
		id="burger"
		aria-label="Ouvrir le menu"
		aria-controls="mobileMenu"
		aria-expanded="false"
	>
		&#9776;
	</button>
	<!-- Menu de navigation mobile -->
	<nav class="mobile-menu" id="mobileMenu" aria-label="Menu mobile">
		<button id="closeMenu" class="mobile-menu__close">×</button>
		<div>
			<div class="mobile-menu__container">
				<span class="text-logo">Gamer<br />Challenges</span>
			</div>

			<div class="mobile-menu__container">
				<ul>
					<li><a href="/" class="mobile-link" sveltekit:prefetch>Accueil</a></li>
					<li>
						<a href="/games" class="mobile-link" sveltekit:prefetch>Catalogue</a>
					</li>
					<li>
						<a href="/about" class="mobile-link" sveltekit:prefetch>À propos</a>
					</li>
				</ul>
			</div>

			<div class="mobile-menu__container user-section">
				{#if isAuthenticated()}
					<a href="/me" class="mobile-link" sveltekit:prefetch>Mon compte</a>
					<p class="connected-user">
						Vous êtes connecté en tant que : <span class="connected-user__pseudo"
							>{userInfo.pseudo}</span
						>
					</p>
				{:else}
					<ul>
						<li>
							<a href="/auth/login" class="mobile-link" sveltekit:prefetch>Me connecter</a>
						</li>
						<li>
							<a href="/auth/register" class="mobile-link strong" sveltekit:prefetch
								>Créer un compte</a
							>
						</li>
					</ul>
				{/if}
			</div>
		</div>

		<div>
			<p class="copyright">Tous droits GamerChallenges 2025</p>
		</div>
	</nav>
</header>

<style>
	.button {
		display: flex;
		justify-content: center;
		margin: 1rem auto;
	}
	.search-input {
		color: white;
	}
	.search-results {
		position: absolute;
		z-index: 11000;
	}
	.btn-result {
		border-left: none;
		border-right: none;
		border-top: none;
		margin-left: 1rem;
		min-width: 279px;
		text-align: left;
		padding: 0.7rem 4px;
		font-size: 1.2rem;
		color: rgba(51, 50, 50, 0.877);
		font-weight: bold;
	}
	.btn-result:hover {
		border-radius: 2px;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background: linear-gradient(135deg, #ffffff 0%, #636363 100%);
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		color: white;
	}

	.mobile-menu__container {
		border-top: 1px solid rgba(255, 255, 255, 0.3);
		padding: 1em;
		text-align: center;
	}

	.text-logo {
		font-size: 4vh;
		font-weight: bold;
		color: #eee;
		margin-bottom: 1em;
		font-family: 'Orbitron', sans-serif;
	}

	.connected-user {
		font-size: 0.8em;
		margin-top: 0.8em;
	}

	.connected-user__pseudo {
		font-weight: bold;
		color: #8b1e1e;
		transition: color 0.2s;
	}

	.copyright {
		font-size: 0.8em;
		color: #ccc;
		margin-bottom: 2em;
		text-align: center;
	}

	@media (min-width: 0px) and (max-width: 380.98px) {
		.btn-result {
			min-width: 290px;
			font-size: 0.6rem;
		}
	}

	@media (min-width: 381px) and (max-width: 567.98px) {
		.btn-result {
			min-width: 340px;
			font-size: 0.8rem;
		}
	}

	/* Tablettes et plus (>= 768px) : 2 colonnes */
	@media (min-width: 568px) {
		.btn-result {
			min-width: 370px;
			font-size: 1rem;
		}
	}

	/* Desktop (>= 1024px) : 3 colonnes */
	@media (min-width: 1024px) {
		.btn-result {
			min-width: 500px;
			font-size: 1.2rem;
		}
	}
</style>
