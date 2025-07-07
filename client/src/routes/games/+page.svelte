<script>
    import CatalogItem from '$lib/components/ui/CatalogItem.svelte';
    export let data;
    let games = data.games;
  </script>
  
  <section class="catalog" aria-labelledby="catalog-title">
    <h1>Choisissez un jeu et lancez vous dans un défi !</h1>
    <div class="catalog__grid" role="list">
      {#each games as game}
        <CatalogItem {game} />
      {/each}
    </div>
  </section>