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

	// onMount(async () => {
	// 	try {
	// 		userInfoJSON = localStorage.getItem('user');
	// 		userInfo = JSON.parse(userInfoJSON);
	// 		//console.log("userInfo", userInfo);
	// 		const user = await getUserById(userInfo.id);
	// 		// console.log("Utilisateur récupéré :", user);
	// 		userAvatar = user.avatar;
	// 		// console.log("Avatar récupéré :", userAvatar);
	// 	} catch (error) {
	// 		console.error("Erreur lors de la récupération de l'avatar :", error);
	// 	}
	// });

	onMount(async () => {
		try {
			userInfoJSON = localStorage.getItem('user');

			if (!userInfoJSON) {
				console.warn('Aucune donnée utilisateur trouvée dans le localStorage');
				return; // ⛔ éviter l'erreur en quittant
			}

			userInfo = JSON.parse(userInfoJSON);

			if (!userInfo || !userInfo.id) {
				console.warn('userInfo invalide ou sans ID :', userInfo);
				return;
			}

			const user = await getUserById(userInfo.id);

			if (user && user.avatar) {
				userAvatar = user.avatar;
			} else {
				console.warn("Aucun avatar trouvé pour l'utilisateur");
			}
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

<header class="header" aria-label="En-tête principal du site Gamer Challenge">
	<!-- Logo du site -->
	<a href="/" class="header__logo" aria-label="Retour à l’accueil (logo Gamer Challenge)">GC</a>

	<!-- Barre de recherche -->
	<div class="header__search-bar" aria-label="Barre de recherche de jeux">
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
			<ul class="search-results" role="list" aria-label="Résultats de recherche">
				{#each searchResults as game}
					<li class="result-game">
						<a href={`/games/${game.id}`} class="result-media" role="button">
							<span class="result-cover" role="button" style={`background-image: url(${game.image})`}></span>
						</a>
						<button
							type="button"
							class="btn-result"
							on:click={() => redirectSearch(`/games/${game.id}`)}
						>
							{game.title}
						</button>
					</li>
				{/each}
			</ul>
		{:else if searchQuery.trim() !== ''}
			<p class="no-result" role="status" aria-live="polite">Aucun résultat trouvé</p>
		{/if}
	</div>

	<!-- Navigation desktop -->
	<nav class="desktop-nav" role="navigation" aria-label="Menu principal">
		<ul class="desktop-nav__list">
			<li class="desktop-nav__item">
				<a href="/" class="nav-link">Accueil</a>
			</li>
			<li class="desktop-nav__item">
				<a href="/games" class="nav-link">Catalogue</a>
			</li>
			<li class="desktop-nav__item">
				<a href="/contact" class="nav-link">Contact</a>
			</li>

			{#if isAuthenticated()}
				<li class="desktop-nav__item">
					<a href="/me" class="nav-link">Mon compte</a>
				</li>
			{:else}
				<li class="desktop-nav__item">
					<a href="/auth/login" class="nav-link">Connexion</a>
				</li>
				<li class="desktop-nav__item">
					<a href="/auth/register" class="nav-link strong">Créer un compte</a>
				</li>
			{/if}
		</ul>
	</nav>

	<!-- Bouton menu burger (mobile) -->
	<button
		class="burger"
		id="burger"
		aria-label="Ouvrir le menu mobile"
		aria-controls="mobileMenu"
		aria-expanded="false"
	>
		&#9776;
	</button>

	<!-- Menu de navigation mobile -->
	<nav class="mobile-menu" id="mobileMenu" aria-label="Menu de navigation mobile">
		<button id="closeMenu" class="mobile-menu__close" aria-label="Fermer le menu">×</button>
		<div>
			<div class="mobile-menu__container">
				<span class="text-logo">Gamer<br />Challenges</span>
			</div>

			<div class="mobile-menu__container">
				<ul>
					<li><a href="/" class="mobile-link">Accueil</a></li>
					<li><a href="/games" class="mobile-link">Catalogue</a></li>
					<li><a href="/contact" class="mobile-link">Contact</a></li>
				</ul>
			</div>

			<div class="mobile-menu__container user-section">
				{#if isAuthenticated()}
					<a href="/me" class="mobile-link">Mon compte</a>
					<p class="connected-user">
						Vous êtes connecté en tant que : <span class="connected-user__pseudo"
							>{userInfo.pseudo}</span
						>
					</p>
				{:else}
					<ul>
						<li><a href="/auth/login" class="mobile-link">Me connecter</a></li>
						<li><a href="/auth/register" class="mobile-link strong">Créer un compte</a></li>
					</ul>
				{/if}
			</div>
		</div>

		<div>
			<p class="copyright">Tous droits GamerChallenges 2025</p>
		</div>
	</nav>
</header>