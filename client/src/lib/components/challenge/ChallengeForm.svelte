<script>
  import { challengeCreation } from '$lib/services/challengeCreation.service.js';
  let title = '';
  let description = '';
  let rules = '';

  async function handleSubmit() {
    if (!title || !description || !rules ) {
      error = "Des informations sont manquantes.";
      return;
    }
    try {
      await challengeCreation( title, description, rules );
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