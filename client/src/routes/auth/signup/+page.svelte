<script>
  import AuthForm from "$lib/components/auth/AuthForm.svelte";
  import Input from "$lib/components/auth/Input.svelte";  
  import BtnAuth from "$lib/components/auth/BtnAuth.svelte";
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
  <AuthForm onSubmit={handleSubmit}>
    <Input id="username" type="text" label="Nom d'utilisateur" bind:value={username} required />
    <Input id="first_name" type="text" label="Prénom" bind:value={first_name} required />
    <Input id="last_name" type="text" label="Nom" bind:value={last_name} required />
    <Input id="birth_date" type="date" label="Date de naissance" bind:value={birth_date} required />
    <Input id="email" type="email" label="Email" bind:value={email} required /> 
    <Input id="password" type="password" label="Mot de passe" bind:value={password} required minlength="8" maxlength="50"/>
    <Input id="confirmPassword" type="password" label="Confirmer le mot de passe" bind:value={confirmPassword} required minlength="8" maxlength="50"/>
    
    <BtnAuth>S'inscrire</BtnAuth>
  </AuthForm>
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
