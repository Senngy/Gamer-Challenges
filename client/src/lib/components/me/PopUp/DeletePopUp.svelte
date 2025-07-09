<script>
import { deleteAccount } from "$lib/services/auth.service.js";
export let onClose; // Fonction pour fermer la popup

async function handleSubmitDelete() {
  try {
    await deleteAccount()
  } catch (error) {
    error = "Nous n'avons pas pu supprimé votre compte.";
      return;
  }
}
function redirect(url) { // Redirige vers une autre page
  goto(url);
}
</script>

  <div class="popup-content">
    <h3>Êtes-vous sûr de vouloir supprimer votre compte ?</h3>
    <p>Cette action est irréversible.</p>
      <div class="buttons">
        <button class="btn confirm" on:click={() => {handleSubmitDelete(); redirect('/exit');}}>Confirmer</button>
        <button class="btn cancel" on:click={onClose}>Annuler</button>
      </div>
  </div>

<style>

  .popup-content {
    background: rgba(0, 0, 0, 0.8) ;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    color: white;
  }
  .buttons {
    margin-top: 1rem;
  }
  .btn {
    margin: 0 1rem
  }


</style>