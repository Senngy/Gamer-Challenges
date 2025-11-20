<script>
  let { id = '', type = 'text', label = '', value, placeholder = '', name = '', disabled = false } = $props();
  /*export let id = '';
  export let type = 'text';
  export let label = '';
  export let value;
  export let placeholder = '';
  export let name = '';
  export let disabled = false;*/
</script>

<div>
  <label for={id}>{label}</label>
  <input
    id={id}
    type={type}
    name={name}
    bind:value
    required
    placeholder={placeholder}
    disabled={disabled}
  />
</div>

<style>
  label {
    font-weight: bold;
    margin-bottom: 0.3rem;
    display: block;
    padding-left: 2rem;
    /* or text-align: center; */

  }
  input {
    width: 100%;
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 14px;
  }
  input::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
</style>