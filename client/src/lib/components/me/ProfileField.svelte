<script>
  export let label;
  export let value;
  export let actionLabel = '';
  export let actionHref = '';
</script>

<div class="container">
  <label>{label}</label>
  <div>{value}</div>
  {#if actionLabel}
    <a href={actionHref}>{actionLabel}</a>
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 0.5rem;
    font-weight: 600;
    font-size: 0.95rem;
  }

  div {
    background: #444;
    border: none;
    padding: 0.6rem;
    border-radius: 6px;
    color: #fff;
    font-size: 1rem;
  }

  a {
    margin-top: 0.3rem;
    color: #4f8cff;
    font-size: 0.9rem;
    text-decoration: underline;
    align-self: flex-start;
  }
</style>