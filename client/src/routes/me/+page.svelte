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
  export let label = "Photo de profil / Avatar";
  export let imageUrl = ""; // L'URL actuelle de l'avatar
  export let id = "avatar-upload";

  let previewUrl = imageUrl;

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
</script>

<div class="profile-container">
  <h2>Mon profil</h2>
    <div class="user-info">
  <div class="container">
    <label for="email">Email :</label>
    <div>{user.email}</div>
  </div>

  <div class="container">
    <label for="birth_date">Date de naissance :</label>
    <div>{user.birth_date}</div>
  </div>

  <div class="container pseudo">
    <label for="pseudo" class="pseudo">Pseudo :</label>
    <div>{user.username}</div>
    <a href="/auth/change-password">Modifier le pseudo</a>
  </div>

  <div class="container password">
    <label for="password">Mot de passe :</label>
    <div>••••••••</div>
    <a href="/auth/change-password">Modifier le mot de passe</a>
  </div>

  <div class="container avatar-container">
    <label for={id}>{label}</label>
      <img src={previewUrl || "https://via.placeholder.com/100"} alt="Avatar" />
    <input type="file" id={id} accept="image/*" on:change={handleFileChange} />
  </div>

  <div class="container delete-account">
    <label for="delete">Suppression de compte :</label>
    <button class="btn delete" on:click={deleteAccount}>Supprimer mon compte</button>
  </div>
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
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 2rem;
}

.user-info {
  background: #2b0a0a;
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.container {
  display: flex;
  flex-direction: column;
}

.container label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
}

.container div, 
.container input {
  background: #444;
  border: none;
  padding: 0.6rem;
  border-radius: 6px;
  color: #fff;
  font-size: 1rem;
}

.container a {
  margin-top: 0.3rem;
  color: #4f8cff;
  font-size: 0.9rem;
  text-decoration: underline;
  align-self: flex-start;
}

.btn.logout,
.btn.delete {
  display: inline-block;
  background: #e54747;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 1.2rem;
}

.btn.logout:hover,
.btn.delete:hover {
  background: #b91c1c;
}

.container.delete-account {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
  align-items: flex-start;
}


</style>