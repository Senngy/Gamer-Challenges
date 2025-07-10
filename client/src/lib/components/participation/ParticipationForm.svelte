<script>
  import { participationCreation } from '$lib/services/participation.service.js';
  let media_link = '';
  let description = '';

  async function handleSubmit() {
    if (!media_link || !description ) {
      error = "Des informations sont manquantes.";
      return;
    }
    try {
      await participationCreation( media_linl, description );
      error = '';
    } catch (e) {
      error = e.message;
    }
  }

  export let onSubmit = () => {};
</script>

<form on:submit|preventDefault={onSubmit}>
  <slot />
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>