<script>
    import CatalogItem from '$lib/components/ui/CatalogItem.svelte';
</script>

<!-- Catalog Section -->
<section class="catalog" aria-labelledby="catalog-title">
    <h1>Choisissez un jeu et lancez vous dans un défi !</h1>
    <div class="catalog__grid" role="list">

            <CatalogItem />
            <CatalogItem />
            <CatalogItem />
            <CatalogItem />
            <CatalogItem />
            <CatalogItem />

    </div>
    <div class="load-more-container">
        <button class="btn" id="load-more">
            Voir plus de jeux
        </button>
    </div>
</section>