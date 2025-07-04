<script>
  // Exemple de données utilisateur (à remplacer par des données réelles)
  let user = {
    username: " ",
    first_name: " ",
    last_name: " ",
    email: " ",
    birth_date: ""
  };

  let challenges = [
    { title: " ", status: " " },
    { title: " ", status: " " },
    { title: " ", status: " " },
  ];

  function logout() {
    // Logique de déconnexion ici
    alert("Déconnexion !");
  }
</script>

<div class="profile-container">
  <h2>Mon profil</h2>
  <div class="user-info">
    <div><strong>Nom d'utilisateur :</strong> {user.username}</div>
    <div><strong>Prénom :</strong> {user.first_name}</div>
    <div><strong>Nom :</strong> {user.last_name}</div>
    <div><strong>Email :</strong> {user.email}</div>
    <div><strong>Date de naissance :</strong> {user.birth_date}</div>
  </div>
  <button class="btn logout" on:click={logout}>Se déconnecter</button>

  <h3>Mes challenges</h3>
  <ul class="challenges-list">
    {#each challenges as challenge}
      <li>
        <span>{challenge.title}</span>
        <span class="status">{challenge.status}</span>
      </li>
    {/each}
  </ul>
</div>

<style>
  .profile-container {
    max-width: 500px;
    margin: 40px auto;
    padding: 2rem;
    background: #222;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    color: #fff;
  }
  h2, h3 {
    text-align: center;
    margin-bottom: 1rem;
  }
  .user-info {
    background: #2b0a0a;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .btn.logout {
    display: block;
    margin: 1rem auto 2rem auto;
    background: #e54747;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 0.7rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn.logout:hover {
    background: #b91c1c;
  }
  .challenges-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .challenges-list li {
    background: #333;
    margin-bottom: 0.7rem;
    padding: 0.8rem 1rem;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .status {
    font-size: 0.95em;
    padding: 0.2em 0.7em;
    border-radius: 12px;
    background: #4f8cff;
    color: #fff;
  }
</style>