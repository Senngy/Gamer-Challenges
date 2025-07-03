<script>
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import '../reset.css';
</script>

<!-- HEADER -->
<header class="header">
  <Navbar />
</header>
<main>
  <slot /> <!-- contenu de chaque page -->
</main>

