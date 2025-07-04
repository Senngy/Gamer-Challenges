<script>
  // Tu pourras plus tard gérer les données via une API ou store
</script>
<nav>
  <img src="/favicon.svg" alt="Logo GamerChallenge" class="logo" />
  <input type="text" class="search" placeholder="Rechercher votre jeux 🔍" />
  <div class="buttons">
    <button class="btn">Inscription</button>
    <button class="btn btn-secondary">Connexion</button>
  </div>
</nav>
<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #2b0a0a;
  }
  .logo {
    width: 50px;
    border-radius: 50%;
  }
  .search {
    flex: 1;
    margin: 0 2rem;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    border: none;
    background: #3a1d1d;
    color: white;
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
</style>