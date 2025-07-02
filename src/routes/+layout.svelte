<script>
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
</script>

<Navbar />

<main>
  <slot /> <!-- contenu de chaque page -->
</main>

<Footer />