<script>
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import CookieConsent from '$lib/components/ui/CookieConsent.svelte';
  import { Toaster, toast } from 'svelte-sonner'
</script>

<Header />

<main class="main-content">
  <slot />
</main>

<Footer />
<CookieConsent />
<Toaster richColors  />