<script>
  let isLoggedIn = false;

  function signUp() {
    isLoggedIn = true;
  }

  function logout() {
    isLoggedIn = false;
  }
</script>

<nav>
  <div class="logo">MonApp</div>
  <div class="actions">
    {#if isLoggedIn}
      <button on:click={logout}>Déconnexion</button>
    {:else}
      <button on:click={signUp}>Inscription</button>
      <button on:click={signUp}>Connexion</button>
    {/if}
  </div>
  <div class="links">
    <a href="/game">Jeux</a>
  </div>
    
</nav>

<main>
  {#if isLoggedIn}
    <p>Bienvenue, vous êtes connecté ! 🎉</p>
  {:else}
    <p>Veuillez vous inscrire pour continuer.</p>
  {/if}
</main>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ccc;
    font-family: sans-serif;
  }

  .logo {
    font-weight: bold;
    font-size: 1.25rem;
  }

  .actions button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .actions button:hover {
    background-color: #0056b3;
  }

  main {
    padding: 2rem;
    font-family: sans-serif;
    font-size: 1rem;
  }
</style>