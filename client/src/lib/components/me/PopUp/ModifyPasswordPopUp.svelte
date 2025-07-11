<script>
  import Input from '$lib/components/auth/Input.svelte';
  import { updatePassword } from "$lib/services/auth.service.js";

  let currentPassword =  $state(''); // Mot de passe actuel
  let newPassword =  $state(''); // Nouveau mot de passe
  let confirmPassword =  $state(''); // Confirmation du nouveau mot de passe
  let error =  $state(''); // Message d'erreur
  let success = $state(''); // Message de succès

  async function handleSubmit() { // Fonction pour gérer la soumission du formulaire
    if (newPassword !== confirmPassword) {
      error = "Les nouveaux mots de passe ne correspondent pas.";
      return;
    }
    if (!currentPassword || !newPassword || !confirmPassword) {
      error = "Veuillez remplir tous les champs.";
      return;
    }
    if (newPassword.length < 8) {
      error = "Le nouveau mot de passe doit contenir au moins 8 caractères.";
      return;
    }
    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      error = "Le nouveau mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.";
      return;
    }
    if (newPassword === currentPassword) {
      error = "Le nouveau mot de passe doit être différent de l'ancien.";
      return;
    }
    try {
      await updatePassword(currentPassword, newPassword);
      console.log('Mot de passe mis à jour avec succès');
      // Ici, vous pouvez appeler une fonction pour mettre à jour le mot de passe
      // Par exemple, onSubmit({ currentPassword, newPassword });
      success = "Modification du mot de passe réussi ✅"
    } catch (e) {
      console.error('Erreur lors de la mise à jour du mot de passe :', e);
      error = "Une erreur est survenue lors de la mise à jour du mot de passe.";
      return;
    }
    error = '';
  }
  
</script>


  <div class="popup-content">
    <h3>Modifier votre mot de passe</h3>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="input-group">
        <Input
          id="current-password"
          type="password"
          label="Mot de passe actuel"
          placeholder="Mot de passe actuel"
          bind:value={currentPassword}
        />
      </div>
      <div class="input-group">
        <Input
          id="new-password"
          type="password"
          label="Nouveau mot de passe"
          placeholder="Nouveau mot de passe"
          bind:value={newPassword}
        />
      </div>
      <div class="input-group">
        <Input
          id="confirm-password"
          type="password"
          label="Confirmer le nouveau mot de passe"
          placeholder="Confirmer le nouveau mot de passe"
          bind:value={confirmPassword}
        />
      </div>
      {#if error}
        <p class="error">{error}</p>
      {/if}
      <div class="buttons">
        <button class="btn confirm" type="submit">Confirmer</button>
        <button class="btn cancel" type="button" on:click={c}>Annuler</button>
      </div>
    </form>
     {#if success}
        <p class="success">{success}</p>
     {/if}
  </div>


<style>
  .popup-content {
    /*
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 2rem;
    */
   /* padding: 20px; */
    border-radius: 10px;
    text-align: center;
    color: white;
  }
  .error {
    color: red;
    margin-bottom: 10px;
  }
  .input-group {
    margin: 1rem 0;
  }
  .btn {
    margin: 0 1rem;
  }
  .success {
		color: #a3cca4;
		text-align: center;
		margin-bottom: 1rem;
    margin-top: 1rem;
	}
 
</style>
