<script>
  import AuthForm from "$lib/components/auth/AuthForm.svelte";
  import Input from "$lib/components/auth/Input.svelte";  
  import Btn from "$lib/components/auth/Btn.svelte";
  import AuthContainer from "$lib/components/auth/AuthContainer.svelte";
  import { register } from "$lib/services/auth.service.js";
  import { validateRegistrationForm } from "$lib/verification/validation.form.register.js";
  import { goto } from "$app/navigation";
  
  let pseudo = $state('');
  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');
  let error = $state('');
  let birth_date = $state('');
  let first_name = $state('');
  let last_name = $state('');

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    
    // ✅ Préparation des données pour validation
    const formData = { pseudo, email, password, confirmPassword, first_name, last_name, birth_date };
    
    // ✅ Validation complète avec le fichier validation.secure.js
    const validationResult = validateRegistrationForm(formData);
    
    // ❌ Si validation échoue, on bloque tout et affiche l'erreur
    if (!validationResult.isValid) {
      // Afficher la première erreur trouvée
      const firstError = Object.values(validationResult.errors)[0];
      error = firstError;
      return; // 🛑 BLOQUE la redirection
    }
    
    // ✅ Si validation réussit, on continue avec l'inscription
    try {
      await register(pseudo, email, password, birth_date, first_name, last_name);
      
      // Succès : on efface l'erreur et redirige
      error = '';
      alert('Inscription réussie ! Vous allez être redirigé vers la page de connexion...');
      goto('/auth/login');
      
    } catch (e) {
      // Erreur serveur
      error = "Une erreur est survenue lors de l'inscription.";
      // 🛑 Pas de redirection en cas d'erreur serveur
    }
  };
</script>

<AuthContainer title="Inscription">
  {#if error}
    <div class="error">{error}</div>
  {/if}
  <AuthForm onSubmit={handleSubmitRegister}>
    <Input id="pseudo" type="text" label="Nom d'utilisateur" placeholder="Entrez votre nom d'utilisateur" bind:value={pseudo} required />
    <Input id="first_name" type="text" label="Prénom" placeholder="Entrez votre prénom" bind:value={first_name} required />
    <Input id="last_name" type="text" label="Nom" placeholder="Entrez votre nom" bind:value={last_name} required />
    <Input id="birth_date" type="date" label="Date de naissance" bind:value={birth_date} required />
    <Input id="email" type="email" label="Email" placeholder="Entrez votre email" bind:value={email} required /> 
    <Input id="password" type="password" label="Mot de passe" placeholder="Entrez votre mot de passe" bind:value={password} required minlength="8" maxlength="50"/>
    <Input id="confirmPassword" type="password" label="Confirmer le mot de passe" placeholder="Confirmez votre mot de passe" bind:value={confirmPassword} required minlength="8" maxlength="50"/>
    
    <Btn>S'inscrire</Btn>
  </AuthForm>
  <div class="already-account">
    <span>Vous avez déjà un compte ?</span>
    <a href="/auth/login">Cliquez ici</a>
  </div>
</AuthContainer>

<style>
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
