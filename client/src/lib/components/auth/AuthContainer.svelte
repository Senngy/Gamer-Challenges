<script>
    export let title = "";
    export let classCSS ="";
</script>
<div class={`auth-container ${classCSS}`}>  
  <h2>{title}</h2>
  <slot></slot> <!-- This slot allows you to pass in the form content -->
</div>
<style>
  .auth-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 0 2rem 2rem 2rem;
  }
  .log-container {
    margin: 0 auto;
    min-width: 300px;
  }
  h2 {
    margin-bottom: 0.8rem;
    font-size: 2rem;
  }

</style>