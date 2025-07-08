<script>
  // Exemple de données utilisateur (à remplacer par des données réelles)
  import { onMount } from 'svelte';
  import AuthContainer from '$lib/components/auth/AuthContainer.svelte';
  import ProfilePopUp from '$lib/components/me/PopUp/ProfilePopUp.svelte';
  import DeletePopUp from '$lib/components/me/PopUp/DeletePopUp.svelte';
  import ModifyPasswordPopUp from '$lib/components/me/PopUp/ModifyPasswordPopUp.svelte';
  import ModifyPseudoPopUp from '$lib/components/me/PopUp/ModifyPseudoPopUp.svelte'; // Si vous avez besoin de modifier le pseudo
  import Btn from '$lib/components/me/Btn.svelte';
	import { goto } from '$app/navigation'; // Pour la navigation
  import { authStore, clearAuth, setAuth, getAuth } from '$lib/store/authStore.svelte.js'; // Importation du store d'authentification
  import { getCurrentUser } from '$lib/services/auth.service.js'; // Fonction pour récupérer
	import { get } from 'svelte/store';

  // import { deleteAccount } from '$lib/api/user'; // Assurez-vous d'avoir une fonction pour supprimer le compte
  // import { getUserData } from '$lib/api/user'; // Fonction pour récupérer les données utilisateur
  // import { getChallenges } from '$lib/api/challenges'; // Fonction pour récupérer les challenges
  
  let user = $state({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    birth_date: ""
  });

  let challenges = $state([
    { title: " ", status: " " },
    { title: " ", status: " " },
    { title: " ", status: " " },
  ]);
  const getUserInfos = async () => { // Fonction pour récupérer les informations de l'utilisateur
    // Remplacez cette logique par un appel API réel pour récupérer les données utilisateur
    
    try {
      const userInfos = await getCurrentUser();
     // const storedUser = localStorage.getItem('user');
     //if (!storedUser) throw new Error('Aucune donnée utilisateur en localStorage');
     // const userInfos = JSON.parse(storedUser); // 🔥 Parse la string en objet
    
      console.log("User Infos:", userInfos);
      user = {
        pseudo: userInfos.pseudo,
        email: userInfos.email,
        avatar: userInfos.avatar
      };
      challenges = userInfos.challenge_created || []; // Assurez-vous que les challenges sont récupérés correctement
      // Attention, challenges est un tableau d'objet [{},{},{}]
      console.log("Challenges:", challenges);
    } catch (error) {
      console.error("Erreur lors de la récupération des informations utilisateur :", error);
    }
  };
  function logout() { // Fonction de déconnexion
    // Logique de déconnexion ici
    // Nettoyer le localStorage
    // Mettre à jour le store d'authentification
    clearAuth(); // Nettoyage du store d'authentification
    // Destruction du token d'authentification dans le back 
    console.log('Déconnexion réussie');  
    alert("Déconnexion !");
  }
  
  let label = "Photo de profil / Avatar";
  let imageUrl = ""; // L'URL actuelle de l'avatar
  let id = "avatar-upload";

  let previewUrl = $state(imageUrl);

  function handleFileChange(event) { // Fonction pour gérer le changement de fichier pour l'avatar
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  let activeModal = $state(null); // Pour gérer l'état des popups

  function open(modal) { // Ouvre la popup
    activeModal = modal; console.log("Which popup is active:", activeModal);
  } 
  function close() { activeModal = null; } // Ferme la popup active

  function redirect(url) { // Redirige vers une autre page
    goto(url);
  }

getUserInfos(); // Appel de la fonction pour récupérer les infos utilisateur au chargement du composant

</script>
<AuthContainer title="Mon profil">
    <div class="user-info">
  <div class="container email">
    <label for="email">Email :</label>
    <div>{user.email}</div>
  </div>

  <div class="container pseudo">
    <label for="pseudo" class="pseudo">Pseudo :</label>
    <div>{user.pseudo}</div>
    <button class="modify" on:click={() => open('modifyPseudo')}>Modifier le pseudo</button>
  </div>

  <div class="container password">
    <label for="password">Mot de passe :</label>
    <div>••••••••</div>
    <button class="modify" style="cursor:pointer" on:click={() => open('modifyPassword')}>Modifier le mot de passe</button>
  </div>

  <div class="container avatar-container">
    <label for={id}>{label}</label>
      <img src={previewUrl || "https://via.placeholder.com/100"} alt="Avatar" />
    <input type="file" id={id} accept="image/*" on:change={handleFileChange} />
  </div>

  <div class="container delete-account">
    <label for="delete">Suppression de compte :</label>
    <Btn on:click={() => open('deletePassword')}>Supprimer mon compte</Btn>
    
  </div>

</div>
  {#if activeModal}
    <!-- Wrapper qui gère l’ouverture/fermeture générale -->
    <ProfilePopUp bind:open={activeModal} on:close={close}> <!-- Utilisation de la popup -->
      {#if activeModal=== 'deletePassword'} <!-- Popup de suppression de compte -->
        <DeletePopUp  on:close={close} /> 
      {:else if activeModal === 'modifyPassword'} <!-- Popup de modification de mot de passe -->
        <ModifyPasswordPopUp  
          on:submit={(data) => {console.log("Nouveau mot de passe :", data.newPassword); close(); }}
          on:close:{close}
        />
      {:else if activeModal === 'modifyPseudo'} <!-- Popup de modification de pseudo -->
        <ModifyPseudoPopUp  
          on:submit={(data) => {console.log("Nouveau pseudo :", data.newPseudo); close(); }}
          on:close={close}
        />
      {/if}  
    </ProfilePopUp>  
  {/if}    

  <!-- Bouton de déconnexion -->
  <Btn class="btn logout" on:click={() => {logout(); redirect('/');}}>Se déconnecter</Btn>

  <!--Challenges de l'utilisateur-->
  <div class="challenges">
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
</AuthContainer>

<style>
.user-info {
  background: none;
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
  width: 100%;
   padding: 10px 20px;
   border: none;
   border-radius: 25px;
   background: rgba(255, 255, 255, 0.2);
   color: white;
   font-size: 14px;
}
.container.delete-account {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 2rem;
  align-items: flex-start;
}
.modify {
  background: none;
  color: #4f8cff;
  text-decoration: underline;
  border: none;
}
.challenges {
  margin-top: 2rem;
}


</style>