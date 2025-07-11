<script>
  import { authStore, getAuth, isAuthenticated, clearAuth } from "$lib/store/authStore.svelte";
  import { getUserById } from "$lib/services/user.service";
  import Btn from "$lib/components/me/Btn.svelte";
  import { goto } from "$app/navigation";
  import { logout } from "$lib/services/auth.service.js";
  import { onMount } from "svelte";
  let userInfo = $state({});
  let userInfoJSON = null;
  let userAvatar = null;

  onMount(async () => {
      try {
        userInfoJSON = localStorage.getItem("user");
        userInfo = JSON.parse(userInfoJSON);
        console.log("userInfo", userInfo);
        const user = await getUserById(userInfo.id);
        console.log("Utilisateur récupéré :", user);
        userAvatar = user.avatar;
        console.log("Avatar récupéré :", userAvatar);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'avatar :", error);
      }
  });


  $effect(() => {
    getAuth();
  });

  
 async function cleanLogout() { // Fonction de déconnexion
    // Logique de déconnexion ici
    try {
      await logout(); // Appel de la fonction de déconnexion
      clearAuth(); // Nettoyage du store d'authentification
      // Destruction du token d'authentification dans le back 
      console.log('Déconnexion réussie');  
      alert("Déconnexion !");
   
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
    // Nettoyer le localStorage
    // Mettre à jour le store d'authentification
    
  }
  function redirect(url) { // Redirige vers une autre page
    goto(url);
    window.location.reload();  // force le reload complet après la redirection SPA
  }

</script>

<header class="header" aria-label="En-tête du site Gamer Challenge">
  <!-- Logo du site -->
   {#if isAuthenticated()}
     <div class="header__logo" aria-label="Logo Gamer Challenge">GC</div>
     <p>{userInfo.pseudo}</p>
   {/if}

  <!-- Barre de recherche -->
  <div class="header__search-bar" aria-label="Barre de recherche">
    <label for="search" class="visually-hidden">Rechercher un jeu</label>
    <input
      type="search"
      id="search"
      name="search"
      placeholder="Rechercher votre jeu... 🔍"
      aria-label="Rechercher un jeu"
    />
  </div>

  <!-- Bouton menu burger -->
  <button
    class="burger"
    id="burger"
    aria-label="Ouvrir le menu"
    aria-controls="mobileMenu"
    aria-expanded="false"
  >
    &#9776;
  </button>
  <!-- Menu de navigation mobile -->
  <nav class="mobile-menu" id="mobileMenu" aria-label="Menu mobile">
    <button id="closeMenu" class="mobile-menu__close">×</button>
    <ul>
      <li><a href="/" class="mobile-link" sveltekit:prefetch>Accueil</a></li>
      <li>
        <a href="/games" class="mobile-link" sveltekit:prefetch>Catalogue</a>
      </li>
      <li>
        <a href="/about" class="mobile-link" sveltekit:prefetch>À propos</a>
      </li>
      {#if isAuthenticated()}
      <li>
        <a href="/me" class="mobile-link" sveltekit:prefetch>Mon compte</a>
      </li>
      <li class="button">
      <Btn class="btn logout" on:click={() => {cleanLogout(); redirect('/');}}>Se déconnecter</Btn>
      </li>
      {:else}
      <li>
        <a href="/auth/signup" class="mobile-link" sveltekit:prefetch>Inscription</a>
      </li>
      <li>
        <a href="/auth/login" class="mobile-link" sveltekit:prefetch>Connexion</a>
      </li>
      {/if}
    </ul>
  </nav>
</header>
<style>
  .button {
    display: flex;
    justify-content: center;
    margin: 1rem auto;
  }
</style>