<script>
  let username = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let error = '';
  let birth_date = '';
  let first_name = '';
  let last_name = '';

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
  <h2>Inscription</h2>
  {#if error}
    <div class="error">{error}</div>
  {/if}
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="username">Nom d'utilisateur</label>
      <input id="username" type="text" bind:value={username} required placeholder="Nom d'utilisateur" />
    </div>    
    <div>
      <label for="first_name">Prénom</label>
      <input id="first_name" type="text" bind:value={first_name} required placeholder="Prénom" />
    </div>    
    <div>
      <label for="last_name">Nom</label>
      <input id="last_name" type="text" bind:value={last_name} required placeholder="Nom" />
    </div>
    <div>
      <label for="email">Email</label>
      <input id="email" type="email" bind:value={email} required maxlength="320" placeholder="exemple@gmail.com" />
    </div>
    <div>
      <label for="birth_date">Date de naissance</label>
      <input id="birth_date" type="date" bind:value={birth_date} required placeholder="JJ/MM/AAAA" />
    </div>
    <div>
      <label for="password">Mot de passe</label>
      <input id="password" type="password" bind:value={password} required minlength="8" maxlength="50" placeholder="Mot de passe" />
    </div>
    <div>
      <label for="confirmPassword">Confirmer le mot de passe</label>
      <input id="confirmPassword" type="password" bind:value={confirmPassword} required minlength="8" maxlength="50" placeholder="Confirmer le mot de passe" />
    </div>
    <button class="btn" type="submit">S'inscrire</button>
  </form>
  <div class="already-account">
    <span>Vous avez déjà un compte ?</span>
    <a href="/auth/login">Cliquez ici</a>
  </div>
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
  .btn {
    padding: 0.8rem;
    background: #4f8cff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn:hover {
    background: #2563eb;
  }
  .error {
    color: #ff6b6b;
    text-align: center;
    margin-bottom: 1rem;
  }
  .already-account {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 1rem;
  }
  .already-account a {
    color: #4f8cff;
    text-decoration: underline;
    margin-left: 0.3rem;
    cursor: pointer;
    transition: color 0.2s;
  }
  .already-account a:hover {
    color: #2563eb;
  }
</style>
