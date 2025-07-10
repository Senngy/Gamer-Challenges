<script>
  export let isOpen = false;
  export let close = () => {};
</script>

{#if isOpen}
  <div class="overlay" on:click={close}>
    <div class="modal" on:click|stopPropagation>
      <slot />
      <button class="close" on:click={close}>×</button>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .modal {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 20px;
    max-width: 500px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    position: relative;
  }
  .close {
    position: absolute;
    top: 0.5rem;
    right: 0.75rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: white;
    border-radius: 50%;
    width: 44px;
    height: 44px;
  }
  .close:hover {
    background: rgba(255, 255, 255, 0.1);
  }
</style>