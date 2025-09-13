<script>
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import CookieConsent from '$lib/components/ui/CookieConsent.svelte';
  import { Toaster, toast } from 'svelte-sonner' // Pour les notifications 
</script>

<Header />

<main class="main-content">
  <slot />
</main>

<Footer />
<CookieConsent />
<Toaster richColors  />