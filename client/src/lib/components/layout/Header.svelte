<header class="header" aria-label="En-tête du site Gamer Challenge">
  <!-- Logo du site -->
  <div class="header__logo" aria-label="Logo Gamer Challenge">GC</div>

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
        <a href="/apropos" class="mobile-link" sveltekit:prefetch>À propos</a>
      </li>
      <li>
        <a href="/auth/signup" class="mobile-link" sveltekit:prefetch
          >Inscription</a
        >
      </li>
      <li>
        <a href="/auth/login" class="mobile-link" sveltekit:prefetch
          >Connexion</a
        >
      </li>
    </ul>
  </nav>
</header>
