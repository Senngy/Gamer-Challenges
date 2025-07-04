<script>
  export let id = '';
  export let type = 'text';
  export let label = '';
  export let value;
</script>

<div>
  <label for={id}>{label}</label>
  <input
    id={id}
    type={type}
    bind:value
    required
  />
</div>

<style>
  label {
    font-weight: bold;
    margin-bottom: 0.3rem;
    display: block;
  }
  input {
    padding: 0.7rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    width: 100%;
  }
</style>