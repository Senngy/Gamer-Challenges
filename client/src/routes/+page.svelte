<script>
  // Tu pourras plus tard gérer les données via une API ou store
</script>



<!-- CONTENU PRINCIPAL -->
<main class="main">
  <!-- SLIDER -->
  <section class="hero">
    <div class="badge">🔥 Populaire</div>
    <h1>VALORANT</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
    <div class="tags">
      <span class="tag">FPS</span>
      <span class="tag">5v5</span>
    </div>
    <div class="slider-controls">
      <button>←</button>
      <button>→</button>
    </div>
  </section>

  <!-- CHALLENGERS -->
  <aside class="challengers">
    <h2>Top challengers 🏆<br><span>#Gamerchallenges</span></h2>
    <ul>
      <li>
        <img src="/avatar.png" alt="avatar" />
        <div>
          <strong>Babytoto</strong>
          <span>💖 12</span>
          <span>🥇</span>
        </div>
        <div class="tags">
          <span class="tag">Stratégie</span>
          <span class="tag">Battle royale</span>
        </div>
      </li>
      <!-- Répète pour les autres challengers -->
    </ul>
  </aside>

  <!-- CATALOGUE -->
  <section class="catalogue">
    <h2>Également sur notre catalogue</h2>
    <div class="cards">
      <div class="card">
        <img src="/apex.jpg" alt="Apex Legends" />
        <div class="info">
          <h3>Apex Legends</h3>
          <p>Saison 5</p>
          <div class="tags">
            <span class="tag">Stratégie</span>
            <span class="tag">Battle royale</span>
          </div>
          <div class="likes">Nombre de like ❤️</div>
        </div>
      </div>
      <!-- Autres cartes -->
    </div>
  </section>
</main>

<!-- FOOTER -->
<footer class="footer">
  <div>
    <img src="/logo.png" class="logo-small" />
    <p>Gamer challenge<br />2025, Tous droits réservés.</p>
  </div>
  <nav>
    <a href="#">Accueil</a>
    <a href="#">À propos</a>
    <a href="#">Contact</a>
    <a href="#">Mentions légales</a>
  </nav>
  <div>
    <p>Email: GameChallenge@gmail.com</p>
    <p>Téléphone: +33 1 23 45 67 89</p>
    <p>Adresse: 42 rue de l’Innovation, 75000 Paris</p>
  </div>
</footer>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(#220202, #121212);
    color: #fff;
  }

  .header {
   
  }

  

  

  .buttons .btn {
    margin-left: 1rem;
    background: #e54747;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    color: white;
    cursor: pointer;
  }

  .btn-secondary {
    background: transparent;
    border: 1px solid #e54747;
  }

  .main {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 2rem;
    padding: 2rem;
  }

  .hero {
    background: #1c1c1c;
    border-radius: 20px;
    padding: 2rem;
  }

  .badge {
    background: #e54747;
    padding: 0.2rem 1rem;
    border-radius: 15px;
    display: inline-block;
    margin-bottom: 1rem;
  }

  .challengers {
    background: #2e2e2e;
    border-radius: 20px;
    padding: 1rem;
  }

  .challengers ul {
    list-style: none;
    padding: 0;
  }

  .challengers li {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .challengers img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .tag {
    background: #444;
    padding: 0.2rem 0.5rem;
    border-radius: 10px;
    font-size: 0.75rem;
  }

  .catalogue {
    grid-column: span 2;
    margin-top: 2rem;
  }

  .catalogue .cards {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .card {
    background: #1f1f1f;
    border-radius: 20px;
    overflow: hidden;
    width: 200px;
  }

  .card img {
    width: 100%;
    display: block;
  }

  .card .info {
    padding: 1rem;
  }

  .footer {
    background: #1a1a1a;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 0.9rem;
  }

  .logo-small {
    width: 40px;
    border-radius: 50%;
  }
</style>