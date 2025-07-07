<script>
  import Input from '$lib/components/auth/Input.svelte';
  export let onClose; // Fonction pour fermer la popup
  export let onSubmit; // Fonction pour soumettre le nouveau mot de passe

  let currentPassword = ''; // Mot de passe actuel
  let newPassword = ''; // Nouveau mot de passe
  let confirmPassword = ''; // Confirmation du nouveau mot de passe
  let error = ''; // Message d'erreur

  function handleSubmit() { // Fonction pour gérer la soumission du formulaire
    if (newPassword !== confirmPassword) {
      error = "Les nouveaux mots de passe ne correspondent pas.";
      return;
    }
    error = '';
    onSubmit({ currentPassword, newPassword }); // Appel de la fonction onSubmit avec les données du formulaire
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
        <button class="btn cancel" type="button" on:click={onClose}>Annuler</button>
      </div>
    </form>
  </div>


<style>
  .popup-content {
    background: rgba(59, 56, 56, 0.847);
    padding: 20px;
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
 
</style>
