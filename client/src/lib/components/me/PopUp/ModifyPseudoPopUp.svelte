<script>
  import Input from '$lib/components/auth/Input.svelte';
  export let onClose; // Fonction pour fermer la popup
  export let onSubmit; // Fonction pour soumettre le nouveau mot de passe

  let currentPseudo = ''; // Pseudo actuel
  let newPseudo = ''; // Nouveuau pseudo
  let error = ''; // Message d'erreur

  function handleSubmit() { // Fonction pour gérer la soumission du formulaire
    if (!newPseudo) {
      error = "Veuillez saisir un nouveau pseudo.";
      return;
    }
    error = '';
    onSubmit({ newPseudo }); // Appel de la fonction onSubmit avec les données du formulaire
  }
</script>


  <div class="popup-content">
    <h3>Modifier votre pseudo</h3>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="input-group">
        <Input
          id="current-pseudo"
          type="text"
          label="Pseudo actuel"
          placeholder="Pseudo actuel"
          bind:value={currentPseudo}
        />
      </div>
      <div class="input-group">
        <Input
          id="new-pseudo"
          type="text"
          label="Nouveau pseudo"
          placeholder="Nouveau pseudo"
          bind:value={newPseudo}
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
