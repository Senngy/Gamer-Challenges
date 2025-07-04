<script>
  let username = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let error = '';

  function handleSubmit() {
    if (password !== confirmPassword) {
      error = "Les mots de passe ne correspondent pas.";
      return;
    }
    // Ajoute ici la logique d'inscription (API, etc.)
    error = '';
    alert('Inscription réussie !');
  }
</script>

<div class="signup-container">
  <h2>Connexion</h2>
  {#if error}
    <div class="error">{error}</div>
  {/if}
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="email">Email</label>
      <input id="email" type="email" bind:value={email} required />
    </div>
    <div>
      <label for="password">Mot de passe</label>
      <input id="password" type="password" bind:value={password} required minlength="8"  maxlength="50"/>
    </div>
    <button type="submit">Se connecter</button>
  </form>
</div>

<style>
  .signup-container {
    max-width: 400px;
    margin: 40px auto;
    padding: 2rem;
    background: #222;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    color: #fff;
  }
  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  label {
    font-weight: bold;
    margin-bottom: 0.3rem;
  }
  input {
    padding: 0.7rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
  }
  button {
    padding: 0.8rem;
    background: #4f8cff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  button:hover {
    background: #2563eb;
  }
  .error {
    color: #ff6b6b;
    text-align: center;
    margin-bottom: 1rem;
  }
</style>
