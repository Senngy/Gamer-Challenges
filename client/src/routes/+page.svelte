<script>
    import CatalogItem from '$lib/components/ui/CatalogItem.svelte';
</script>

<head>
  <title>GamerChallenges - Accueil</title>
</head>

<!-- ========================== -->
<!-- Hero Section -->
<!-- ========================== -->
<section class="popular-games" aria-labelledby="popular-games-title">
  <!-- Slide 1 -->
  <div class="popular-games__content slide" data-index="0">
    <div class="popular-games__text">
      <span class="popular-games__tag">🔥 Populaires</span>
      <h1 class="popular-games__title" id="popular-games-title">VALORANT</h1>
      <p class="popular-games__description">
        Valorant est un jeu de tir tactique dans lequel deux équipes de cinq
        joueurs s'affrontent dans des parties intenses, avec des agents dotés de
        compétences uniques.
      </p>
      <button class="btn btn--primary popular-games__btn"
        >Voir les challenges</button
      >
    </div>
    <img
      src="/images/background-valorant.webp"
      alt="Valorant"
      class="slide__image"
    />
  </div>

  <!-- Slide 2 -->
  <div class="popular-games__content slide" data-index="1">
    <div class="popular-games__text">
      <span class="popular-games__tag">🔥 Populaires</span>
      <h1 class="popular-games__title" id="popular-games-title">
        Apex Legends
      </h1>
      <p class="popular-games__description">
        Apex Legends est un jeu de tir en équipe où des légendes s'affrontent
        dans des batailles épiques, chacune avec des compétences uniques.
      </p>
      <button class="btn btn--primary popular-games__btn"
        >Voir les challenges</button
      >
    </div>
    <img
      src="/images/apex-legends.jpg"
      alt="Apex Legends"
      class="slide__image"
    />
  </div>

  <!-- Navigation + Progression -->
  <nav class="popular-games__nav" aria-label="Navigation des jeux populaires">
    <div class="popular-games__arrows">
      <button class="popular-games__arrow prev" aria-label="Jeu précédent"
        >‹</button
      >
      <button class="popular-games__arrow next" aria-label="Jeu suivant"
        >›</button
      >
    </div>

    <div class="popular-games__pagination-wrapper">
      <div class="popular-games__pagination" aria-live="polite">1 / 4</div>
      <svg class="progress-circle" viewBox="0 0 36 36" aria-hidden="true">
        <circle class="circle-bg" cx="12" cy="12" r="10" />
        <circle class="circle-fill" cx="12" cy="12" r="10" />
      </svg>
    </div>
  </nav>
</section>

<!-- ========================== -->
<!-- Leaderboard -->
<!-- ========================== -->
<aside class="leaderboard" aria-labelledby="leaderboard-title">
  <div>
    <h2 class="leaderboard__title" id="leaderboard-title">
      Top challengers 🏆
    </h2>
    <span class="leaderboard__highlight" aria-hidden="true"
      >#Gamerchallenges</span
    >
  </div>

  <!-- Player 1 -->
  <div
    class="leaderboard__item"
    role="listitem"
    aria-label="Joueur 1 : Babyloto, 12 likes, 1er place"
  >
    <div class="leaderboard__player-avatar" aria-hidden="true">B</div>
    <div class="leaderboard__player-info">
      <h3 class="leaderboard__player-name">Babyloto</h3>
      <div class="leaderboard__player-stats">
        <span class="leaderboard__player-stat-heart" aria-hidden="true">❤️</span
        >
        <span class="leaderboard__player-stat-likes">12 likes</span>
      </div>
    </div>
    <div class="leaderboard__player-level" aria-label="1ère place">🏆 1</div>
  </div>

  <span class="leaderboard__divider" role="separator" aria-hidden="true"></span>

  <!-- Player 2 -->
  <div
    class="leaderboard__item"
    role="listitem"
    aria-label="Joueur 2 : Babyloto, 12 likes, 2ème place"
  >
    <div class="leaderboard__player-avatar" aria-hidden="true">B</div>
    <div class="leaderboard__player-info">
      <h3 class="leaderboard__player-name">Babyloto</h3>
      <div class="leaderboard__player-stats">
        <span class="leaderboard__player-stat-heart" aria-hidden="true">❤️</span
        >
        <span class="leaderboard__player-stat-likes">12 likes</span>
      </div>
    </div>
    <div class="leaderboard__player-level" aria-label="2ème place">🥈 2</div>
  </div>

  <span class="leaderboard__divider" role="separator" aria-hidden="true"></span>

  <!-- Player 3 -->
  <div
    class="leaderboard__item"
    role="listitem"
    aria-label="Joueur 3 : Babyloto, 12 likes, 3ème place"
  >
    <div class="leaderboard__player-avatar" aria-hidden="true">B</div>
    <div class="leaderboard__player-info">
      <h3 class="leaderboard__player-name">Babyloto</h3>
      <div class="leaderboard__player-stats">
        <span class="leaderboard__player-stat-heart" aria-hidden="true">❤️</span
        >
        <span class="leaderboard__player-stat-likes">12 likes</span>
      </div>
    </div>
    <div class="leaderboard__player-level" aria-label="3ème place">🥉 3</div>
  </div>
</aside>

<!-- ========================== -->
<!-- Catalog Section -->
<!-- ========================== -->
<section class="catalog" aria-labelledby="catalog-title">
  <h2 class="catalog__title" id="catalog-title">
    Également sur notre catalogue
  </h2>

  <div class="catalog__grid" role="list">
    <CatalogItem />
    <CatalogItem />
    <CatalogItem />
    <CatalogItem />
  </div>

</section>
