<script>
  // Import des transitions natives de Svelte
  import { fade, scale } from 'svelte/transition';

  // Prop de contrôle d’ouverture/fermeture
  export let open = false;

  // Fonction de fermeture de la modal
  function close() {
    open = false;
  }

  // Permet de fermer avec la touche Échap
  function handleKeydown(event) {
    if (event.key === 'Escape') close();
  }
</script>

{#if open}
  <!--
    overlay :
    - couvre l'écran
    - rôle button + tabindex pour accessibilité clavier
    - on:click : ferme la modal au clic en dehors
    - on:keydown : détecte Échap
    - transition:fade : anime l’apparition/disparition
  -->
  <div class="overlay" role="button" tabindex="0" on:click={close} on:keydown={handleKeydown} transition:fade>
    <!--
      modal :
      - bloc principal avec rôle dialog et aria-modal
      - stopPropagation évite la fermeture sur clic intérieur
      - transition:scale ajoute un zoom doux à l’ouverture
    -->
    <div class="modal" role="dialog" aria-modal="true" on:click|stopPropagation transition:scale={{ duration: 200 }}>
      
      <slot /> <!-- Contenu passé via le slot -->
      
      <button class="close-btn" on:click={close} aria-label="Fermer">×</button> <!-- Bouton de fermeture accessible -->
    </div>
  </div>
{/if}

<style>
  /* Même styles que ModalBasic pour consistance visuelle */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 2rem
  }

  .close-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: white;
  }
</style>