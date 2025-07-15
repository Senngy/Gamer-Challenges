<script>
  import { challengeCreation } from '$lib/services/challenge.service.js';
  let title = '';
  let description = '';
  let rules = '';
  export let onSubmit = () => {};
</script>

<form on:submit={onSubmit}>
  <slot />
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>