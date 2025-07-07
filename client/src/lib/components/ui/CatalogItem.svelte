<script>
  export let game;
</script>

<div class="catalog__item" role="listitem" aria-label={game.title}>
  <div
    class="catalog__image"
    role="img"
    aria-label={'Illustration ' + game.title}
  >
    <div class="catalog__like-count" aria-label="Nombre de challenges">
      {game.genre}
    </div>
    {#if game.image}
      <img
        src={'/images/' + game.image}
        alt={game.title}
        style="width:100%;height:100%;object-fit:cover;"
      />
    {/if}
  </div>
  <div class="catalog__content">
    <div class="catalog__tags">
      <span class="catalog__tag">{game.platform}</span>
    </div>
    </div>  
</div>