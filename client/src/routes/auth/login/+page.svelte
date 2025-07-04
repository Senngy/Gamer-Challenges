<script>
  import AuthForm from "$lib/components/auth/AuthForm.svelte"
  import Input from "$lib/components/auth/Input.svelte"
  import BtnAuth from "$lib/components/auth/BtnAuth.svelte"
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
²
<div class="signup-container">
  <h2>Connexion</h2>
  {#if error}
    <div class="error">{error}</div>
  {/if}
  <AuthForm onSubmit={handleSubmit}>
    <Input id="email" type="email" label="Email" bind:value={email} required /> 
    <Input id="password" type="password" label="Mot de passe" bind:value={password} required minlength="8" maxlength="50"/>
    <Input id="confirmPassword" type="password" label="Confirmer le mot de passe" bind:value={confirmPassword} required minlength="8" maxlength="50"/>
    
    <BtnAuth>Se connecter</BtnAuth>
  </AuthForm>
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
</style>
