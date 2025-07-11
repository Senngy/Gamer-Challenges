<script>
  import AuthForm from "$lib/components/auth/AuthForm.svelte"
  import Input from "$lib/components/auth/Input.svelte"
  import BtnAuth from "$lib/components/auth/BtnAuth.svelte"
  import Btn from "$lib/components/auth/Btn.svelte"
  import AuthContainer from "$lib/components/auth/AuthContainer.svelte";
  import { authStore, clearAuth, isAuthenticated, setAuth } from "$lib/store/authStore.svelte.js"; // Importation du store d'authentification
  import { login } from "$lib/services/auth.service.js" // Importation de la fonction de connexion
  import { validateLoginData, sanitizeLoginData } from "$lib/verification/validation.form.login.js"; // Importation des fonctions de validation
  import { goto } from "$app/navigation"; // Importation de la fonction de navigation
  
  let email = $state(''); // Variable pour stocker l'email
  let password = $state(''); // Variable pour stocker le mot de passe
  let errors = $state({}); // Variable pour stocker les erreurs spécifiques à chaque champ
  let generalError = $state(''); // Variable pour stocker les erreurs générales
  let isLoading = $state(false); // Variable pour gérer l'état de chargement

  const handleSubmitLogin = async (e) => { // Fonction pour gérer la soumission du formulaire et la connexion
    console.log('handleSubmitLogin called'); // Affichage d'un message de débogage dans la console
    e.preventDefault(); // Empêche le rechargement de la page
    
    // Reset des erreurs
    errors = {};
    generalError = '';
    
    // Validation côté client
    const validation = validateLoginData(email, password);
    if (!validation.isValid) {
      errors = validation.errors;
      return;
    }
    
    // Nettoyage des données
    const sanitizedCredentials = sanitizeLoginData(email, password);
    
    isLoading = true;
    
    try {
      const { token, user } = await login(sanitizedCredentials); // Appel de la fonction de connexion avec données nettoyées
      console.log('Utilisateur connecté:', user); // Affichage de l'utilisateur connecté dans la console
      setAuth(user, token); // Enregistrer l'utilisateur et le token dans le store
      
      // Redirection vers la page d'accueil après une connexion réussie
      alert('Connexion réussie !');
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur de connexion:', error);
      
      // Gestion des différents types d'erreurs
      if (error.validationErrors) {
        // Erreurs de validation côté client/serveur
        errors = error.validationErrors;
      } else if (error.message) {
        // Erreurs de l'API (mot de passe incorrect, utilisateur non trouvé, etc.)
        if (error.message.includes('email et/ou mot de passe incorrect')) {
          generalError = "Email ou mot de passe incorrect. Veuillez vérifier vos identifiants.";
        } else if (error.message.includes('Token invalid')) {
          generalError = "Session expirée. Veuillez vous reconnecter.";
        } else {
          generalError = error.message;
        }
      } else {
        generalError = "Une erreur inattendue s'est produite. Veuillez réessayer.";
      }
    } finally {
      isLoading = false;
    }
  }

  function redirect(url) { // Redirige vers une autre page
    goto(url);
    window.location.reload();
  }
</script>

<AuthContainer title="Connexion">
  <!-- Affichage des erreurs générales -->
  {#if generalError}
    <div class="error general-error">{generalError}</div>
  {/if}
  
  <AuthForm onSubmit={handleSubmitLogin}>
    <!-- Champ Email avec validation -->
    <div class="input-group">
      <Input 
        id="email" 
        type="email" 
        name="email" 
        label="Email" 
        placeholder="Entrez votre email" 
        bind:value={email} 
        required 
        class={errors.email ? 'input-error' : ''}
        disabled={isLoading}
      /> 
      {#if errors.email}
        <span class="error-message">{errors.email}</span>
      {/if}
    </div>
    
    <!-- Champ Mot de passe avec validation -->
    <div class="input-group">
      <Input 
        id="password" 
        type="password" 
        name="password" 
        label="Mot de passe" 
        placeholder="Entrez votre mot de passe" 
        bind:value={password} 
        required 
        minlength="8" 
        maxlength="128"
        class={errors.password ? 'input-error' : ''}
        disabled={isLoading}
      />
      {#if errors.password}
        <span class="error-message">{errors.password}</span>
      {/if}
    </div>
      
    <Btn disabled={isLoading}>
      {isLoading ? 'Connexion...' : 'Se connecter'}
    </Btn>
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
  
  .general-error {
    background-color: #ffe6e6;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #ffb3b3;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
  }
  
  .input-group {
    margin-bottom: 1rem;
  }
  
  .error-message {
    color: #ff6b6b;
    font-size: 0.8rem;
    margin-top: 0.3rem;
    display: block;
  }
  
  :global(.input-error) {
    border-color: #ff6b6b !important;
    box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2) !important;
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
  
  :global(button:disabled) {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>