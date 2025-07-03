<script>
  import Navbar from '$lib/components/layout/Navbar.svelte';

</script>

<!-- HEADER -->
<header class="header">
  <Navbar />
</header>
<main>
  <slot /> <!-- contenu de chaque page -->
</main>

