<script>

  export let onClose; // Fonction pour fermer la popup
</script>

  <div class="popup-content">
    <h3>Êtes-vous sûr de vouloir supprimer votre compte ?</h3>
    <p>Cette action est irréversible.</p>
    <div class="buttons">
      <button class="btn confirm" on:click={onClose}>Confirmer</button>
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