<!-- src/routes/+error.svelte -->
<script>
  export let error;
  export let status;
</script>

<h1>{status} – {status === 404 ? 'Page introuvable' : 'Erreur inattendue'}</h1>
<p>{error?.message}</p>

<a href="/">Retour à l'accueil</a>