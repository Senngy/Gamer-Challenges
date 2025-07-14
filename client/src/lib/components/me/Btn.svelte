<script>
  export let variant = '';
  console.log('🔍 Variant reçu par Btn:', variant);
</script>
 
 <button type="submit" class={"btn " + variant} on:click>
   <slot></slot> 
 </button>

 <style>
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    background: var(--btn-color);
    color: white;
    transition: all 0.3s ease;
    text-decoration: none;
    text-align: center;
  }
  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  .delete {
    background: transparent;
    color: white;
    border: 1px solid white;
    margin-bottom: 0.5rem;
  }

  .logout {
    margin: 0 auto;
  }
 </style>