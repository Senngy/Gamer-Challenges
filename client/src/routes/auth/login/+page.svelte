<script>
  import AuthForm from "$lib/components/auth/AuthForm.svelte"
  import Input from "$lib/components/auth/Input.svelte"
  import BtnAuth from "$lib/components/auth/BtnAuth.svelte"
  import Btn from "$lib/components/auth/Btn.svelte"
  import AuthContainer from "$lib/components/auth/AuthContainer.svelte";
  import {
    authStore,
    clearAuth,
    isAuthenticated,
    setAuth,
  } from "$lib/store/authStore.svelte.js"; // Importation du store d'authentification
  import { login } from "$lib/services/auth.service.js" // Importation de la fonction de connexion
  import { goto } from "$app/navigation"; // Importation de la fonction de navigation
  let email =  $state(''); // Variable pour stocker l'email
  let password = $state(''); // Variable pour stocker le mot de passe
  let error = $state(''); // Variable pour stocker les messages d'erreur

  const handleSubmitLogin = async (e) => { // Fonction pour gérer la soumission du formulaire et la connexion
    console.log('handleSubmitLogin called'); // Affichage d'un message de débogage dans la console
    e.preventDefault(); // Empêche le rechargement de la page
    if (!email.includes('@')) { // Vérification de la validité de l'email
      error = "Veuillez saisir une adresse email valide.";
      return;
    }
    if (password.length < 8) {  // Vérification de la longueur du mot de passe
      error = "Le mot de passe doit contenir au moins 8 caractères.";
      return;
    } 
    if (email === '' || password === '') {  // Vérification que les champs ne sont pas vides
      error = "Veuillez remplir tous les champs.";
      return;
    }
    /*
    const formData = new FormData(e.target);  // Récupération des données du formulaire
    const email = formData.get("email");  // Récupération du nom d'utilisateur
    const password = formData.get("password");   // Récupération du mot de passe
  */
    try {
      const { token, user } = await login({email, password}); // Appel de la fonction de connexion
      console.log('Utilisateur connecté:', user); // Affichage de l'utilisateur connecté dans la console
      setAuth(user, token); // Enregistrer l'utilisateur et le token dans le store ou le cookie
    } catch (e) {
      error = "Une erreur est survenue lors de la connexion.";
    }  
    error = '';
    alert('Connexion réussie !');
    goto('/'); // Redirection vers la page d'accueil après une connexion réussie
  }
</script>

<AuthContainer title="Connexion">
  {#if error}
    <div class="error">{error}</div>
  {/if}
  <AuthForm onSubmit={handleSubmitLogin}>
    <Input id="email" type="email" name="email" label="Email" placeholder="Entrez votre email" bind:value={email} required /> 
    <Input id="password" type="password" name="password" label="Mot de passe" placeholder="Entrez votre mot de passe" bind:value={password} required minlength="8" maxlength="50"/>
      
    <Btn>Se connecter</Btn>
  </AuthForm>
  <div class="no-account">
    <span>Pas encore de compte ?</span>
    <a href="/auth/signup">Rejoindre la communauté</a>
  </div>
</AuthContainer>

<style>
  .error {
    color: #ff6b6b;
    text-align: center;
    margin-bottom: 1rem;
  }
  .no-account {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 1rem;
  }
  .no-account a {
    color: #4f8cff;
    text-decoration: underline;
    margin-left: 0.3rem;
    cursor: pointer;
    transition: color 0.2s;
  }
  .no-account a:hover {
    color: #2563eb;
  }
</style>
