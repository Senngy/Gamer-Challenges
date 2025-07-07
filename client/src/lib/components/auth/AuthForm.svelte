<script>
  import { register } from '$lib/services/auth.service.js';
  import { goto } from '$app/navigation';
  let username = '';
  let email = '';
  let password = '';
  let birth_date = '';
  let first_name = '';
  let last_name = '';

  async function handleSubmit() {
    if (password !== confirmPassword) {
      error = "Les mots de passe ne correspondent pas.";
      return;
    }
    try {
      await register({ username, email, password, birth_date, first_name, last_name });
      error = '';
      // Redirection vers la page de connexion
      goto('/auth/login');
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