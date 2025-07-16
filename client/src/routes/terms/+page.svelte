<script>
  import { onMount } from 'svelte';
  
  let lastUpdated = "15 juillet 2025";
  
  onMount(() => {
    // Smooth scroll pour les liens d'ancrage
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });
</script>

<svelte:head>
  <title>Conditions générales d'utilisation - GamerChallenges</title>
  <meta name="description" content="Consultez les conditions générales d'utilisation de GamerChallenges. Découvrez vos droits et obligations en utilisant notre plateforme de défis gaming." />
  <meta name="robots" content="index, follow" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
</svelte:head>

<div class="terms-container">
  <div class="terms-header">
    <h1>Conditions générales d'utilisation</h1>
    <p class="last-updated">Dernière mise à jour : {lastUpdated}</p>
  </div>

  <div class="terms-nav">
    <h3>Sommaire</h3>
    <ul>
      <li><a href="#definitions">1. Définitions</a></li>
      <li><a href="#acceptation">2. Acceptation des conditions</a></li>
      <li><a href="#description">3. Description du service</a></li>
      <li><a href="#inscription">4. Inscription et compte utilisateur</a></li>
      <li><a href="#utilisation">5. Règles d'utilisation</a></li>
      <li><a href="#contenu">6. Contenu utilisateur</a></li>
      <li><a href="#challenges">7. Création et participation aux défis</a></li>
      <li><a href="#propriete">8. Propriété intellectuelle</a></li>
      <li><a href="#responsabilite">9. Responsabilité</a></li>
      <li><a href="#donnees">10. Protection des données</a></li>
      <li><a href="#suspension">11. Suspension et résiliation</a></li>
      <li><a href="#modifications">12. Modifications des conditions</a></li>
      <li><a href="#applicable">13. Droit applicable</a></li>
      <li><a href="#contact">14. Contact</a></li>
    </ul>
  </div>

  <div class="terms-content">
    <section id="definitions">
      <h2>1. Définitions</h2>
      <p>Dans les présentes conditions générales d'utilisation (ci-après "CGU"), les termes suivants ont les significations indiquées :</p>
      <ul>
        <li><strong>"GamerChallenges"</strong> ou <strong>"la Plateforme"</strong> : désigne le service en ligne permettant aux utilisateurs de créer et participer à des défis gaming.</li>
        <li><strong>"Utilisateur"</strong> : toute personne physique utilisant la Plateforme, qu'elle soit inscrite ou non.</li>
        <li><strong>"Membre"</strong> : utilisateur ayant créé un compte sur la Plateforme.</li>
        <li><strong>"Défi"</strong> ou <strong>"Challenge"</strong> : activité ludique proposée par un Membre sur la Plateforme en lien avec un jeu vidéo.</li>
        <li><strong>"Participation"</strong> : action d'un Membre de s'inscrire et de réaliser un Défi.</li>
        <li><strong>"Contenu"</strong> : tout élément publié par un Utilisateur (textes, images, vidéos, commentaires, etc.).</li>
      </ul>
    </section>

    <section id="acceptation">
      <h2>2. Acceptation des conditions</h2>
      <p>L'utilisation de GamerChallenges implique l'acceptation pleine et entière des présentes CGU. Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser la Plateforme.</p>
      <p>L'acceptation des CGU est matérialisée par :</p>
      <ul>
        <li>La création d'un compte utilisateur</li>
        <li>La navigation sur la Plateforme</li>
        <li>L'utilisation de nos services</li>
      </ul>
    </section>

    <section id="description">
      <h2>3. Description du service</h2>
      <p>GamerChallenges est une plateforme interactive gratuite dédiée aux passionnés de jeux vidéo qui permet :</p>
      <ul>
        <li><strong>Création de défis</strong> : Les Membres peuvent créer des challenges personnalisés sur leurs jeux favoris</li>
        <li><strong>Participation aux défis</strong> : Les Membres peuvent s'inscrire et participer aux défis créés par la communauté</li>
        <li><strong>Système de progression</strong> : Suivi des participations et des réussites</li>
        <li><strong>Interaction sociale</strong> : Possibilité d'interagir avec d'autres joueurs via les likes et commentaires</li>
        <li><strong>Catalogue de jeux</strong> : Accès à une bibliothèque de jeux supportés</li>
      </ul>
      <p>La Plateforme est accessible 24h/24 et 7j/7, sous réserve des opérations de maintenance nécessaires.</p>
    </section>

    <section id="inscription">
      <h2>4. Inscription et compte utilisateur</h2>
      <h3>4.1 Conditions d'inscription</h3>
      <p>Pour créer un compte, vous devez :</p>
      <ul>
        <li>Être âgé de 13 ans minimum (ou avoir l'autorisation parentale)</li>
        <li>Fournir des informations exactes et à jour</li>
        <li>Choisir un pseudonyme approprié et unique</li>
        <li>Accepter les présentes CGU et notre Politique de confidentialité</li>
      </ul>

      <h3>4.2 Sécurité du compte</h3>
      <p>Vous êtes responsable de :</p>
      <ul>
        <li>La confidentialité de vos identifiants de connexion</li>
        <li>Toutes les activités effectuées depuis votre compte</li>
        <li>Nous signaler immédiatement tout usage non autorisé de votre compte</li>
      </ul>
    </section>

    <section id="utilisation">
      <h2>5. Règles d'utilisation</h2>
      <h3>5.1 Usage autorisé</h3>
      <p>La Plateforme doit être utilisée uniquement dans le cadre prévu, c'est-à-dire :</p>
      <ul>
        <li>Créer des défis gaming créatifs et réalisables</li>
        <li>Participer aux défis de manière fair-play</li>
        <li>Interagir respectueusement avec la communauté</li>
        <li>Partager du contenu en lien avec le gaming</li>
      </ul>

      <h3>5.2 Comportements interdits</h3>
      <p>Il est strictement interdit de :</p>
      <ul>
        <li><strong>Harcèlement</strong> : Harceler, menacer ou intimider d'autres utilisateurs</li>
        <li><strong>Contenu inapproprié</strong> : Publier du contenu à caractère sexuel, violent, discriminatoire ou illégal</li>
        <li><strong>Spam</strong> : Envoyer des messages non sollicités ou répétitifs</li>
        <li><strong>Triche</strong> : Utiliser des moyens déloyaux pour réussir les défis</li>
        <li><strong>Usurpation</strong> : Se faire passer pour une autre personne</li>
        <li><strong>Activités malveillantes</strong> : Pirater, introduire des virus ou compromettre la sécurité</li>
      </ul>
    </section>

    <section id="challenges">
      <h2>7. Création et participation aux défis</h2>
      <h3>7.1 Création de défis</h3>
      <p>En créant un défi, vous vous engagez à :</p>
      <ul>
        <li>Proposer des objectifs clairs et réalisables</li>
        <li>Respecter les droits des éditeurs de jeux</li>
        <li>Ne pas encourager de comportements dangereux ou illégaux</li>
        <li>Fournir des instructions détaillées</li>
      </ul>

      <h3>7.2 Participation aux défis</h3>
      <p>En participant à un défi, vous acceptez de :</p>
      <ul>
        <li>Jouer de manière fair-play et honnête</li>
        <li>Respecter les règles spécifiques du défi</li>
        <li>Fournir des preuves véridiques de votre progression</li>
        <li>Accepter les décisions de modération</li>
      </ul>
    </section>

    <section id="contact">
      <h2>14. Contact</h2>
      <p>Pour toute question concernant ces Conditions générales d'utilisation, vous pouvez nous contacter :</p>
      
      <div class="contact-info">
        <div class="contact-method">
          <h4>📧 Par email</h4>
          <p><a href="mailto:legal@gamerchallenges.com">legal@gamerchallenges.com</a></p>
          <p><a href="mailto:support@gamerchallenges.com">support@gamerchallenges.com</a></p>
        </div>
        
        <div class="contact-method">
          <h4>📝 Par formulaire</h4>
          <p><a href="/contact" class="btn btn-secondary">Formulaire de contact</a></p>
        </div>
        
        <div class="contact-method">
          <h4>💬 Support communautaire</h4>
          <p><a href="/faq">Consultez notre FAQ</a></p>
        </div>
      </div>
    </section>
  </div>

  <div class="terms-footer">
    <p><strong>Dernière mise à jour :</strong> {lastUpdated}</p>
    <p>Ces conditions sont effectives à compter de cette date.</p>
    <div class="footer-links">
      <a href="/privacy" class="btn btn-secondary">Politique de confidentialité</a>
      <a href="/legal" class="btn btn-secondary">Mentions légales</a>
      <a href="/contact" class="btn btn-secondary">Nous contacter</a>
    </div>
  </div>
</div>

<style>
  .terms-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
  }

  .terms-header {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 10px;
  }

  .terms-header h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  .terms-nav {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    border-left: 4px solid #667eea;
  }

  .terms-content section {
    margin-bottom: 3rem;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .terms-content h2 {
    color: #667eea;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    border-bottom: 3px solid #667eea;
    padding-bottom: 0.5rem;
  }

  .contact-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .contact-method {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #e9ecef;
  }

  .btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: #667eea;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: 500;
    transition: background 0.3s ease;
  }

  .btn:hover {
    background: #5a6fd8;
    text-decoration: none;
  }

  .terms-footer {
    text-align: center;
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 8px;
    margin-top: 3rem;
    border-top: 3px solid #667eea;
  }

  /* Responsive Design */
  @media (max-width: 480px) {
    .terms-container {
      padding: 1rem;
    }

    .terms-header h1 {
      font-size: 2rem;
    }

    .contact-info {
      grid-template-columns: 1fr;
    }
  }

  /* Smooth scroll behavior */
  html {
    scroll-behavior: smooth;
  }

  /* Highlight target section */
  section:target {
    background: #f0f7ff;
    transition: background 0.5s ease;
  }
</style>