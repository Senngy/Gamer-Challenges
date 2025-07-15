<script>
  import { onMount } from 'svelte';
  
  let contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  let isSubmitting = false;
  let submitStatus = null;
  
  function resetForm() {
    contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    submitStatus = null;
  }
  
  async function handleSubmit() {
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      submitStatus = 'error';
      return;
    }
    
    isSubmitting = true;
    submitStatus = null;
    
    try {
      // Simuler l'envoi du formulaire
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Ici vous pouvez ajouter votre logique d'envoi réelle
      console.log('Formulaire envoyé:', contactForm);
      
      submitStatus = 'success';
      setTimeout(() => {
        resetForm();
      }, 3000);
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      submitStatus = 'error';
    } finally {
      isSubmitting = false;
    }
  }
  
  onMount(() => {
    // Animation d'apparition progressive des éléments
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    });
    
    document.querySelectorAll('.contact-card, .info-card').forEach(item => {
      observer.observe(item);
    });
  });
</script>

<svelte:head>
  <title>Contact - GamerChallenges</title>
  <meta name="description" content="Contactez l'équipe GamerChallenges. Posez vos questions, signalez des problèmes ou proposez des améliorations." />
</svelte:head>

<main class="contact-container">
  <div class="hero-section">
    <h1>Contactez-nous</h1>
    <p class="hero-subtitle">
      Une question, un problème ou une suggestion ? Notre équipe est là pour vous aider !
    </p>
  </div>

  <div class="contact-content">
    <!-- Formulaire de contact -->
    <div class="contact-card">
      <div class="card-header">
        <h2>Envoyez-nous un message</h2>
        <p>Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.</p>
      </div>
      
      <form on:submit|preventDefault={handleSubmit} class="contact-form">
        <div class="form-row">
          <div class="form-group">
            <label for="name">Nom complet *</label>
            <input 
              type="text" 
              id="name" 
              bind:value={contactForm.name}
              placeholder="Votre nom et prénom"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="email">Email *</label>
            <input 
              type="email" 
              id="email" 
              bind:value={contactForm.email}
              placeholder="votre.email@exemple.com"
              required
            />
          </div>
        </div>
        
        <div class="form-group">
          <label for="subject">Sujet</label>
          <select id="subject" bind:value={contactForm.subject}>
            <option value="">Sélectionnez un sujet</option>
            <option value="question-generale">Question générale</option>
            <option value="probleme-technique">Problème technique</option>
            <option value="bug-report">Signaler un bug</option>
            <option value="suggestion">Suggestion d'amélioration</option>
            <option value="compte">Problème de compte</option>
            <option value="partenariat">Partenariat</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="message">Message *</label>
          <textarea 
            id="message" 
            bind:value={contactForm.message}
            placeholder="Décrivez votre demande en détail..."
            rows="6"
            required
          ></textarea>
        </div>
        
        {#if submitStatus === 'success'}
          <div class="status-message success">
            <div class="status-icon">✅</div>
            <div>
              <strong>Message envoyé avec succès !</strong>
              <p>Nous vous répondrons dans les plus brefs délais. Merci de nous avoir contactés.</p>
            </div>
          </div>
        {/if}
        
        {#if submitStatus === 'error'}
          <div class="status-message error">
            <div class="status-icon">❌</div>
            <div>
              <strong>Erreur lors de l'envoi</strong>
              <p>Veuillez vérifier tous les champs obligatoires et réessayer.</p>
            </div>
          </div>
        {/if}
        
        <button type="submit" class="btn btn-primary" disabled={isSubmitting}>
          {#if isSubmitting}
            <div class="spinner"></div>
            Envoi en cours...
          {:else}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m22 2-7 20-4-9-9-4z"/>
              <path d="M22 2 11 13"/>
            </svg>
            Envoyer le message
          {/if}
        </button>
      </form>
    </div>

    <!-- Informations de contact -->
    <div class="info-section">
      <div class="info-card">
        <div class="info-header">
          <div class="info-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <h3>Nos bureaux</h3>
        </div>
        <p>123 Rue du Gaming<br>75001 Paris, France</p>
      </div>

      <div class="info-card">
        <div class="info-header">
          <div class="info-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h3>Email</h3>
        </div>
        <a href="mailto:support@gamerchallenges.com">support@gamerchallenges.com</a>
        <a href="mailto:contact@gamerchallenges.com">contact@gamerchallenges.com</a>
      </div>

      <div class="info-card">
        <div class="info-header">
          <div class="info-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
          </div>
          <h3>Horaires de support</h3>
        </div>
        <p>Lundi - Vendredi: 9h - 18h<br>Weekend: 10h - 16h</p>
      </div>

      <div class="info-card">
        <div class="info-header">
          <div class="info-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </div>
          <h3>Réseaux sociaux</h3>
        </div>
        <div class="social-links">
          <a href="#" class="social-link discord">
            <img src="/icone/discord.png" alt="Discord" width="20" height="20">
            Discord
          </a>
          <a href="#" class="social-link github">
            <img src="/icone/github.png" alt="GitHub" width="20" height="20">
            GitHub
          </a>
          <a href="#" class="social-link linkedin">
            <img src="/icone/linkedin.png" alt="LinkedIn" width="20" height="20">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Section FAQ rapide -->
  <div class="quick-faq">
    <h2>Questions fréquentes</h2>
    <p>Avant de nous contacter, jetez un œil à notre <a href="/faq" class="faq-link">page FAQ</a> qui contient les réponses aux questions les plus courantes.</p>
    
    <div class="faq-grid">
      <div class="faq-quick-item">
        <h4>Comment créer un compte ?</h4>
        <p>Cliquez sur "S'inscrire" et remplissez le formulaire d'inscription.</p>
      </div>
      <div class="faq-quick-item">
        <h4>Comment signaler un bug ?</h4>
        <p>Utilisez le formulaire ci-dessus en sélectionnant "Signaler un bug".</p>
      </div>
      <div class="faq-quick-item">
        <h4>Délai de réponse ?</h4>
        <p>Nous répondons généralement sous 24h en jours ouvrés.</p>
      </div>
    </div>
  </div>
</main>

<style>
  .contact-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  .hero-section {
    text-align: center;
    margin-bottom: 4rem;
    padding: 2rem 0;
  }

  .hero-section h1 {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .contact-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
    margin-bottom: 4rem;
  }

  .contact-card {
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
  }

  .contact-card:global(.animate-fade-in) {
    opacity: 1;
    transform: translateY(0);
  }

  .card-header {
    margin-bottom: 2rem;
  }

  .card-header h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.5rem;
  }

  .card-header p {
    color: #666;
    line-height: 1.6;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-weight: 500;
    color: #2d3748;
    font-size: 0.9rem;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-family: inherit;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .form-group textarea {
    resize: vertical;
    min-height: 120px;
  }

  .status-message {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    border-radius: 12px;
    font-size: 0.9rem;
  }

  .status-message.success {
    background: #f0fff4;
    color: #22543d;
    border: 1px solid #9ae6b4;
  }

  .status-message.error {
    background: #fff5f5;
    color: #742a2a;
    border: 1px solid #feb2b2;
  }

  .status-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .status-message strong {
    display: block;
    margin-bottom: 0.25rem;
  }

  .status-message p {
    margin: 0;
    opacity: 0.8;
  }

  .btn {
    padding: 1rem 2rem;
    border-radius: 12px;
    font-weight: 500;
    transition: all 0.3s ease;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }

  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .info-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .info-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
  }

  .info-card:global(.animate-fade-in) {
    opacity: 1;
    transform: translateY(0);
  }

  .info-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .info-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .info-card h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #2d3748;
  }

  .info-card p {
    margin: 0;
    color: #666;
    line-height: 1.5;
  }

  .info-card a {
    color: #667eea;
    text-decoration: none;
    display: block;
    margin-bottom: 0.25rem;
  }

  .info-card a:hover {
    text-decoration: underline;
  }

  .social-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .social-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #667eea;
    text-decoration: none;
    padding: 0.5rem;
    border-radius: 6px;
    transition: background-color 0.2s;
  }

  .social-link:hover {
    background: #f7fafc;
    text-decoration: none;
  }

  .quick-faq {
    background: #f8fafc;
    border-radius: 16px;
    padding: 2.5rem;
    text-align: center;
  }

  .quick-faq h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 1rem;
  }

  .quick-faq p {
    color: #666;
    margin-bottom: 2rem;
  }

  .faq-link {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
  }

  .faq-link:hover {
    text-decoration: underline;
  }

  .faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .faq-quick-item {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .faq-quick-item h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: #2d3748;
  }

  .faq-quick-item p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }

  /* Responsive Design */
  @media (max-width: 480px) {
    .contact-container {
      padding: 1rem;
    }

    .hero-section h1 {
      font-size: 2rem;
    }

    .contact-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .contact-card {
      padding: 1.5rem;
    }

    .faq-grid {
      grid-template-columns: 1fr;
    }

    .quick-faq {
      padding: 1.5rem;
    }
  }
</style>