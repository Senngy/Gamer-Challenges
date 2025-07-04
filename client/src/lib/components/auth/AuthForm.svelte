<script>
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