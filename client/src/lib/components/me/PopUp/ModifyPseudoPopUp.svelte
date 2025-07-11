<script>
  import Input from '$lib/components/auth/Input.svelte';
  import { updatePseudo } from '$lib/services/auth.service.js';

  let newPseudo = $state(''); // Nouveuau pseudo
  let error = $state('') // Message d'erreur
  let success = $state(''); // Message de succès

  async function handleSubmit() { 
    if (!newPseudo) {
      error = "Veuillez saisir un nouveau pseudo.";

      return;
    }
    error = '';
    try {
      console.log('Tentative de mise à jour du pseudo:', newPseudo);

      // Appel à la fonction pour mettre à jour le pseudo
      await updatePseudo(newPseudo)
      success = "Modification du pseudo réussi ✅"
    } catch (e) {
      console.error('Erreur lors de la mise à jour du pseudo :', e);
      error = "Une erreur est survenue lors de la mise à jour du pseudo.";
      return;
  }
}
</script>


  <div class="popup-content">
    <h3>Modifier votre pseudo</h3>
    <form on:submit|preventDefault={handleSubmit}>
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
     {#if success}
        <p class="success">{success}</p>
     {/if}
  </div>


<style>
  .popup-content {
   /* background: rgba(59, 56, 56, 0.847); */
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
  .success {
		color: #a3cca4;
		text-align: center;
		margin-top: 1rem;
	}
 
</style>
