<script>
  // Tu pourras plus tard gérer les données via une API ou store
</script>  

<aside class="leaderboard">
    <h2>Joueurs les plus populaires</h2>
    <ol>
        <li>
            <img src="/images/avatar.gif" alt="Avatar de Joueur 1" class="avatar" />
            <strong>Joueur 1</strong>
            <div class="rank">
                <span>Rank #1</span>
                <span>365 Likes</span>
            </div>
        </li>
        <li>
            <img src="/images/avatar.gif" alt="Avatar de Joueur 2" class="avatar" />
            <strong>Joueur 2</strong>
            <div class="rank">
                <span>Rank #2</span>
                <span>233 Likes</span>
            </div>
        </li>
        <li>
            <img src="/images/avatar.gif" alt="Avatar de Joueur 3" class="avatar" />
            <strong>Joueur 3</strong>
            <div class="rank">
                <span>Rank #3</span>
                <span>128 Likes</span>
            </div>
        </li>
    </ol>
</aside>

<style>
 .leaderboard {
    background: #2e2e2e;
    border-radius: 20px;
    padding: 1rem;
  }

  .leaderboard img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  ol {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #ccc;
  }

  .rank {
    display: flex;
    flex-direction: column;
  }
</style>