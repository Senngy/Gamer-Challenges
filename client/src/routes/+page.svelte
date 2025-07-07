<head>
  <title>GamerChallenges - Accueil</title>
</head>

<!-- Hero Section -->
<section class="popular-games" aria-labelledby="popular-games-title">
  <div class="popular-games__pattern-overlay" aria-hidden="true"></div>

  <div class="popular-games__content-wrapper">
    <!-- Slide 1 -->
    <div class="popular-games__content slide">
      <span class="popular-games__tag">🔥 Populaires</span>
      <h1 class="popular-games__title">VALORANT</h1>
      <p class="popular-games__description">
        Valorant est un jeu de tir tactique...
      </p>
      <button class="btn btn--primary popular-games__btn"
        >Voir les challenges</button
      >

      <img src="/images/background-valorant.webp" alt="Valorant" class="slide__image" />
    </div>
  </div>

  <!-- Navigation + Progress -->
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
        <circle class="circle-bg" cx="18" cy="18" r="16" />
        <circle class="circle-fill" cx="18" cy="18" r="16" />
      </svg>
    </div>
  </nav>
</section>

<!-- Leaderboard -->
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

<!-- Catalog Section -->
<section class="catalog" aria-labelledby="catalog-title">
  <h2 class="catalog__title" id="catalog-title">
    Également sur notre catalogue
  </h2>
  <div class="catalog__grid" role="list">
    <!-- Catalog Item -->
    <div
      class="catalog__item"
      role="listitem"
      aria-label="Apex Legends, Saison 5, Stratégie, Battle Royale"
    >
      <div
        class="catalog__image"
        role="img"
        aria-label="Illustration Apex Legends"
      >
        <div class="catalog__like-count" aria-label="Nombre de likes">
          Nombre de like
        </div>
      </div>
      <div class="catalog__content">
        <h3 class="catalog__game-name">Apex Legends</h3>
        <p class="catalog__season">Saison 5</p>
        <div class="catalog__tags">
          <span class="catalog__tag">Stratégie</span>
          <span class="catalog__tag">Battle royale</span>
        </div>
      </div>
    </div>

    <div
      class="catalog__item"
      role="listitem"
      aria-label="Apex Legends, Saison 5, Stratégie, Battle Royale"
    >
      <div
        class="catalog__image"
        role="img"
        aria-label="Illustration Apex Legends"
      >
        <div class="catalog__like-count" aria-label="Nombre de likes">
          Nombre de like
        </div>
      </div>
      <div class="catalog__content">
        <h3 class="catalog__game-name">Apex Legends</h3>
        <p class="catalog__season">Saison 5</p>
        <div class="catalog__tags">
          <span class="catalog__tag">Stratégie</span>
          <span class="catalog__tag">Battle royale</span>
        </div>
      </div>
    </div>

    <div
      class="catalog__item"
      role="listitem"
      aria-label="Apex Legends, Saison 5, Stratégie, Battle Royale"
    >
      <div
        class="catalog__image"
        role="img"
        aria-label="Illustration Apex Legends"
      >
        <div class="catalog__like-count" aria-label="Nombre de likes">
          Nombre de like
        </div>
      </div>
      <div class="catalog__content">
        <h3 class="catalog__game-name">Apex Legends</h3>
        <p class="catalog__season">Saison 5</p>
        <div class="catalog__tags">
          <span class="catalog__tag">Stratégie</span>
          <span class="catalog__tag">Battle royale</span>
        </div>
      </div>
    </div>

    <div
      class="catalog__item"
      role="listitem"
      aria-label="Apex Legends, Saison 5, Stratégie, Battle Royale"
    >
      <div
        class="catalog__image"
        role="img"
        aria-label="Illustration Apex Legends"
      >
        <div class="catalog__like-count" aria-label="Nombre de likes">
          Nombre de like
        </div>
      </div>
      <div class="catalog__content">
        <h3 class="catalog__game-name">Apex Legends</h3>
        <p class="catalog__season">Saison 5</p>
        <div class="catalog__tags">
          <span class="catalog__tag">Stratégie</span>
          <span class="catalog__tag">Battle royale</span>
        </div>
      </div>
    </div>
  </div>
</section>
