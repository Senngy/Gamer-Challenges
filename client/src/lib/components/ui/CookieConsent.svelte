<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { fade, slide } from 'svelte/transition';

  // Store pour gérer l'état du banner
  export const cookieConsent = writable({
    shown: false,
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  let showBanner = false;
  let showDetails = false;
  let consent = {
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  };

  const COOKIE_NAME = 'gamerchallenges_cookie_consent';
  const COOKIE_EXPIRY_DAYS = 365;

  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function acceptAll() {
    consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    saveConsent();
    hideBanner();
  }

  function acceptNecessary() {
    consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    saveConsent();
    hideBanner();
  }

  function saveCustomConsent() {
    saveConsent();
    hideBanner();
  }

  function saveConsent() {
    const consentData = {
      ...consent,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    
    setCookie(COOKIE_NAME, JSON.stringify(consentData), COOKIE_EXPIRY_DAYS);
    cookieConsent.set({ ...consent, shown: false });
    
    // Déclencher les scripts selon le consentement
    if (consent.analytics) {
      loadAnalytics();
    }
    if (consent.marketing) {
      loadMarketing();
    }
    if (consent.preferences) {
      loadPreferences();
    }
  }

  function hideBanner() {
    showBanner = false;
    showDetails = false;
  }

  function toggleDetails() {
    showDetails = !showDetails;
  }

  // Fonctions pour charger les scripts (à adapter selon vos besoins)
  function loadAnalytics() {
    console.log('Chargement des scripts d\'analyse...');
    // Exemple: Google Analytics
    // gtag('consent', 'update', { 'analytics_storage': 'granted' });
  }

  function loadMarketing() {
    console.log('Chargement des scripts marketing...');
    // Exemple: Facebook Pixel, Google Ads
  }

  function loadPreferences() {
    console.log('Chargement des scripts de préférences...');
    // Exemple: scripts de personnalisation
  }

  onMount(() => {
    // Vérifier si le consentement existe déjà
    const existingConsent = getCookie(COOKIE_NAME);
    
    if (existingConsent) {
      try {
        const consentData = JSON.parse(existingConsent);
        consent = {
          necessary: consentData.necessary ?? true,
          analytics: consentData.analytics ?? false,
          marketing: consentData.marketing ?? false,
          preferences: consentData.preferences ?? false
        };
        
        cookieConsent.set({ ...consent, shown: false });
        
        // Charger les scripts selon le consentement existant
        if (consent.analytics) loadAnalytics();
        if (consent.marketing) loadMarketing();
        if (consent.preferences) loadPreferences();
      } catch (e) {
        console.error('Erreur lors du parsing du consentement:', e);
        showBanner = true;
      }
    } else {
      showBanner = true;
      cookieConsent.set({ ...consent, shown: true });
    }
  });
</script>

{#if showBanner}
  <div class="cookie-banner" transition:slide={{ duration: 400 }}>
    <div class="banner-content">
      <div class="banner-main">
        <div class="cookie-icon">🍪</div>
        
        <div class="banner-text">
          <h3>Gestion des cookies</h3>
          <p>
            Nous utilisons des cookies pour améliorer votre expérience sur GamerChallenges, 
            analyser le trafic et personnaliser le contenu. Vous pouvez choisir quels cookies accepter.
          </p>
        </div>
      </div>

      <div class="banner-actions">
        <button 
          class="btn btn-secondary btn-small" 
          on:click={toggleDetails}
          aria-expanded={showDetails}
        >
          {showDetails ? 'Masquer les détails' : 'Personnaliser'}
        </button>
        <button class="btn btn-tertiary btn-small" on:click={acceptNecessary}>
          Nécessaires uniquement
        </button>
        <button class="btn btn-primary btn-small" on:click={acceptAll}>
          Tout accepter
        </button>
      </div>
    </div>

    {#if showDetails}
      <div class="cookie-details" transition:slide={{ duration: 300 }}>
        <div class="details-content">
          <h4>Paramètres détaillés des cookies</h4>
          
          <div class="cookie-category">
            <div class="category-header">
              <label class="toggle-switch">
                <input 
                  type="checkbox" 
                  bind:checked={consent.necessary} 
                  disabled
                />
                <span class="toggle-slider"></span>
                <span class="category-title">Cookies nécessaires</span>
              </label>
              <span class="category-status required">Obligatoire</span>
            </div>
            <p class="category-description">
              Ces cookies sont essentiels au fonctionnement du site. Ils permettent les fonctionnalités de base 
              comme la navigation et l'accès aux zones sécurisées.
            </p>
          </div>

          <div class="cookie-category">
            <div class="category-header">
              <label class="toggle-switch">
                <input 
                  type="checkbox" 
                  bind:checked={consent.analytics}
                />
                <span class="toggle-slider"></span>
                <span class="category-title">Cookies d'analyse</span>
              </label>
              <span class="category-status">Optionnel</span>
            </div>
            <p class="category-description">
              Ces cookies nous aident à comprendre comment vous utilisez notre site pour l'améliorer. 
              Ils collectent des informations anonymes sur les pages visitées.
            </p>
          </div>

          <div class="cookie-category">
            <div class="category-header">
              <label class="toggle-switch">
                <input 
                  type="checkbox" 
                  bind:checked={consent.marketing}
                />
                <span class="toggle-slider"></span>
                <span class="category-title">Cookies marketing</span>
              </label>
              <span class="category-status">Optionnel</span>
            </div>
            <p class="category-description">
              Ces cookies sont utilisés pour afficher des publicités personnalisées et mesurer 
              l'efficacité de nos campagnes marketing.
            </p>
          </div>

          <div class="cookie-category">
            <div class="category-header">
              <label class="toggle-switch">
                <input 
                  type="checkbox" 
                  bind:checked={consent.preferences}
                />
                <span class="toggle-slider"></span>
                <span class="category-title">Cookies de préférences</span>
              </label>
              <span class="category-status">Optionnel</span>
            </div>
            <p class="category-description">
              Ces cookies permettent de mémoriser vos préférences (langue, région, paramètres d'affichage) 
              pour personnaliser votre expérience.
            </p>
          </div>

          <div class="details-actions">
            <button class="btn btn-secondary" on:click={toggleDetails}>
              Fermer
            </button>
            <button class="btn btn-primary" on:click={saveCustomConsent}>
              Sauvegarder mes préférences
            </button>
          </div>

          <div class="legal-links">
            <a href="/legalNotices" target="_blank">Politique de confidentialité</a>
            <a href="/legalNotices" target="_blank">Politique des cookies</a>
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    border-top: 1px solid #e2e8f0;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  .banner-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem;
  }

  .banner-main {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .cookie-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .banner-text {
    flex: 1;
  }

  .banner-text h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #2d3748;
  }

  .banner-text p {
    margin: 0;
    color: #4a5568;
    line-height: 1.5;
    font-size: 0.9rem;
  }

  .banner-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .btn {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.85rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .btn-small {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  .btn-secondary {
    background: #f7fafc;
    color: #4a5568;
    border: 1px solid #e2e8f0;
  }

  .btn-secondary:hover {
    background: #edf2f7;
    border-color: #cbd5e0;
  }

  .btn-tertiary {
    background: transparent;
    color: #667eea;
    border: 1px solid #667eea;
  }

  .btn-tertiary:hover {
    background: #667eea;
    color: white;
  }

  .cookie-details {
    border-top: 1px solid #e2e8f0;
    background: #f8fafc;
  }

  .details-content {
    padding: 1.5rem 0;
  }

  .details-content h4 {
    margin: 0 0 1.5rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: #2d3748;
  }

  .cookie-category {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
  }

  .category-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .toggle-switch {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    flex: 1;
  }

  .toggle-switch input {
    display: none;
  }

  .toggle-slider {
    width: 44px;
    height: 24px;
    background: #cbd5e0;
    border-radius: 12px;
    position: relative;
    transition: background 0.2s ease;
    flex-shrink: 0;
  }

  .toggle-slider::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: transform 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .toggle-switch input:checked + .toggle-slider {
    background: #667eea;
  }

  .toggle-switch input:checked + .toggle-slider::after {
    transform: translateX(20px);
  }

  .toggle-switch input:disabled + .toggle-slider {
    background: #a0aec0;
    cursor: not-allowed;
  }

  .category-title {
    font-weight: 500;
    color: #2d3748;
    font-size: 0.9rem;
  }

  .category-status {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-weight: 500;
  }

  .category-status.required {
    background: #fed7d7;
    color: #742a2a;
  }

  .category-status:not(.required) {
    background: #e6fffa;
    color: #234e52;
  }

  .category-description {
    margin: 0;
    color: #666;
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .details-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;
  }

  .legal-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;
  }

  .legal-links a {
    color: #667eea;
    text-decoration: none;
    font-size: 0.8rem;
  }

  .legal-links a:hover {
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    .cookie-banner {
      bottom: 0;
      left: 0;
      right: 0;
    }

    .banner-content {
      padding: 0.75rem;
    }

    .cookie-icon {
      width: 40px;
      height: 40px;
    }

    .banner-text h3 {
      font-size: 1rem;
    }

    .banner-text p {
      font-size: 0.85rem;
    }
  }
</style>