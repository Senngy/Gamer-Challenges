<script>
  // +error.svelte '/' Home
  import { page } from '$app/state'; // natif svelte
	const { error, status } = $props();

	const is404 = status === 404;
	const is500 = status === 500;

    let pageTitle = status === 404
    ? 'Page introuvable'
    : status === 500
    ? 'Erreur serveur'
    : 'Erreur';
</script>

<svelte:head>
	<title>
		{pageTitle} | GamerChallenges
	</title>
</svelte:head>

<div class="error-page">
	<h1>{page.status}: {page.error.message}</h1> 

	{#if is404}
		<h2 class="title">Page introuvable</h2>
		<p class="message">La page que vous recherchez n'existe pas ou a été déplacée.</p>
	{:else if is500}
		<h2 class="title">Erreur serveur</h2>
		<p class="message">Une erreur interne est survenue. Veuillez réessayer plus tard.</p>
	{:else}
		<h2 class="title">Une erreur est survenue</h2>
		<p class="message">{error?.message ?? 'Erreur inconnue'}</p>
	{/if}

	<a href="/" class="home-link">Retour à l'accueil</a>

</div>

<style>
	.error-page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2rem;
		font-family: sans-serif;
	}

	.status {
		font-size: 4rem;
		color: #d32f2f;
		margin-bottom: 1rem;
	}

	.title {
		font-size: 1.8rem;
		margin-bottom: 0.5rem;
	}

	.message {
		color: #555;
		margin-bottom: 2rem;
	}

	.home-link {
		display: inline-block;
		background-color: #1976d2;
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 5px;
		text-decoration: none;
		font-weight: bold;
	}

	.home-link:hover {
		background-color: #125ca1;
	}

	.stack-trace {
		margin-top: 2rem;
		background: #f5f5f5;
		padding: 1rem;
		text-align: left;
		font-size: 0.9rem;
		color: #333;
		border: 1px solid #ccc;
		overflow-x: auto;
		max-width: 800px;
	}
</style>
