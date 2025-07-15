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
  <title>Politique de confidentialité - GamerChallenges</title>
  <meta name="description" content="Découvrez comment GamerChallenges protège vos données personnelles. Notre politique de confidentialité détaille la collecte, l'utilisation et la protection de vos informations." />
  <meta name="robots" content="index, follow" />
</svelte:head>

<div class="privacy-container">
  <div class="privacy-header">
    <h1>Politique de confidentialité</h1>
    <p class="last-updated">Dernière mise à jour : {lastUpdated}</p>
    <p class="intro">Chez GamerChallenges, nous prenons la protection de vos données personnelles très au sérieux. Cette politique explique comment nous collectons, utilisons et protégeons vos informations.</p>
  </div>

  <div class="privacy-nav">
    <h3>Sommaire</h3>
    <ul>
      <li><a href="#introduction">1. Introduction</a></li>
      <li><a href="#responsable">2. Responsable du traitement</a></li>
      <li><a href="#donnees-collectees">3. Données personnelles collectées</a></li>
      <li><a href="#finalites">4. Finalités du traitement</a></li>
      <li><a href="#base-legale">5. Base légale du traitement</a></li>
      <li><a href="#partage-donnees">6. Partage des données</a></li>
      <li><a href="#conservation">7. Durée de conservation</a></li>
      <li><a href="#securite">8. Sécurité des données</a></li>
      <li><a href="#droits">9. Vos droits</a></li>
      <li><a href="#cookies">10. Cookies et technologies similaires</a></li>
      <li><a href="#mineurs">11. Protection des mineurs</a></li>
      <li><a href="#transferts">12. Transferts internationaux</a></li>
      <li><a href="#modifications">13. Modifications de la politique</a></li>
      <li><a href="#contact">14. Contact</a></li>
    </ul>
  </div>

  <div class="privacy-content">
    <section id="introduction">
      <h2>1. Introduction</h2>
      <p>La présente politique de confidentialité s'applique à l'utilisation de la plateforme GamerChallenges, accessible via notre site web et nos applications mobiles. Elle décrit les pratiques de GamerChallenges concernant la collecte, l'utilisation, le stockage et la divulgation des informations personnelles des utilisateurs.</p>
      
      <div class="highlight-box">
        <h4>🔒 Notre engagement</h4>
        <p>Nous nous engageons à respecter le Règlement Général sur la Protection des Données (RGPD) et toutes les lois applicables en matière de protection des données personnelles.</p>
      </div>
    </section>

    <section id="responsable">
      <h2>2. Responsable du traitement</h2>
      <div class="contact-card">
        <h4>GamerChallenges</h4>
        <p><strong>Statut :</strong> Projet étudiant - École O'Clock</p>
        <p><strong>Contact :</strong> lamine@email.com</p>
        <p><strong>Délégué à la protection des données :</strong> support@gamerchallenges.com</p>
      </div>
    </section>

    <section id="donnees-collectees">
      <h2>3. Données personnelles collectées</h2>
      
      <h3>3.1 Données collectées lors de l'inscription</h3>
      <div class="data-grid">
        <div class="data-category">
          <h4>🆔 Données d'identification</h4>
          <ul>
            <li>Pseudonyme (obligatoire)</li>
            <li>Adresse email (obligatoire)</li>
            <li>Mot de passe (hashé et salé)</li>
            <li>Date de création du compte</li>
          </ul>
        </div>

        <div class="data-category">
          <h4>🎮 Données de profil gaming</h4>
          <ul>
            <li>Avatar/photo de profil (optionnel)</li>
            <li>Bio/description personnelle (optionnel)</li>
            <li>Préférences de jeux</li>
            <li>Niveau d'expérience déclaré</li>
          </ul>
        </div>
      </div>

      <h3>3.2 Données collectées lors de l'utilisation</h3>
      <div class="data-grid">
        <div class="data-category">
          <h4>📊 Données d'activité</h4>
          <ul>
            <li>Défis créés et leurs détails</li>
            <li>Participations aux défis</li>
            <li>Likes et interactions</li>
            <li>Commentaires et messages</li>
            <li>Progression et réussites</li>
          </ul>
        </div>

        <div class="data-category">
          <h4>🔍 Données techniques</h4>
          <ul>
            <li>Adresse IP</li>
            <li>Type de navigateur et version</li>
            <li>Système d'exploitation</li>
            <li>Pages visitées et temps passé</li>
            <li>Référent et URL de sortie</li>
          </ul>
        </div>
      </div>
    </section>

    <section id="finalites">
      <h2>4. Finalités du traitement</h2>
      
      <div class="purpose-grid">
        <div class="purpose-item">
          <h4>🎯 Fonctionnement de la plateforme</h4>
          <ul>
            <li>Création et gestion de votre compte</li>
            <li>Authentification et sécurité</li>
            <li>Personnalisation de l'expérience utilisateur</li>
            <li>Sauvegarde de vos préférences</li>
          </ul>
        </div>

        <div class="purpose-item">
          <h4>🏆 Gestion des défis</h4>
          <ul>
            <li>Création et publication de défis</li>
            <li>Suivi des participations</li>
            <li>Système de progression et achievements</li>
            <li>Modération du contenu</li>
          </ul>
        </div>

        <div class="purpose-item">
          <h4>👥 Interactions sociales</h4>
          <ul>
            <li>Affichage des profils publics</li>
            <li>Système de likes et commentaires</li>
            <li>Classements et statistiques</li>
            <li>Recommandations de contenu</li>
          </ul>
        </div>

        <div class="purpose-item">
          <h4>🛠️ Amélioration du service</h4>
          <ul>
            <li>Analyse d'usage et statistiques</li>
            <li>Détection et prévention des abus</li>
            <li>Support technique</li>
            <li>Développement de nouvelles fonctionnalités</li>
          </ul>
        </div>
      </div>
    </section>

    <section id="base-legale">
      <h2>5. Base légale du traitement</h2>
      
      <div class="legal-basis">
        <div class="basis-item">
          <h4>📋 Exécution d'un contrat</h4>
          <p>Le traitement de vos données est nécessaire pour l'exécution des conditions générales d'utilisation que vous avez acceptées.</p>
        </div>

        <div class="basis-item">
          <h4>✅ Consentement</h4>
          <p>Certaines données sont traitées avec votre consentement explicite (photo de profil, préférences marketing).</p>
        </div>

        <div class="basis-item">
          <h4>⚖️ Intérêt légitime</h4>
          <p>L'amélioration de nos services, la sécurité et la prévention des fraudes constituent nos intérêts légitimes.</p>
        </div>
      </div>
    </section>

    <section id="partage-donnees">
      <h2>6. Partage des données</h2>
      
      <div class="sharing-info">
        <div class="no-sharing">
          <h4>🚫 Nous ne vendons jamais vos données</h4>
          <p>GamerChallenges ne vend, ne loue et ne cède jamais vos données personnelles à des tiers à des fins commerciales.</p>
        </div>

        <h3>Partage limité dans les cas suivants :</h3>
        <div class="sharing-cases">
          <div class="case-item">
            <h4>👥 Données publiques</h4>
            <p>Votre pseudonyme, avatar et certaines activités sont visibles publiquement selon vos paramètres de confidentialité.</p>
          </div>

          <div class="case-item">
            <h4>🔧 Prestataires techniques</h4>
            <p>Hébergement, base de données et services d'infrastructure (avec contrats de confidentialité).</p>
          </div>

          <div class="case-item">
            <h4>⚖️ Obligations légales</h4>
            <p>En cas de demande judiciaire ou d'obligation légale impérative.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="conservation">
      <h2>7. Durée de conservation</h2>
      
      <div class="retention-table">
        <div class="retention-row">
          <div class="data-type">Données de compte actif</div>
          <div class="duration">Tant que le compte est actif</div>
        </div>
        <div class="retention-row">
          <div class="data-type">Données après suppression de compte</div>
          <div class="duration">30 jours (puis suppression définitive)</div>
        </div>
        <div class="retention-row">
          <div class="data-type">Logs de sécurité</div>
          <div class="duration">12 mois maximum</div>
        </div>
        <div class="retention-row">
          <div class="data-type">Données analytiques anonymisées</div>
          <div class="duration">24 mois</div>
        </div>
      </div>
    </section>

    <section id="securite">
      <h2>8. Sécurité des données</h2>
      
      <div class="security-measures">
        <div class="measure-category">
          <h4>🔐 Chiffrement</h4>
          <ul>
            <li>HTTPS/TLS pour toutes les communications</li>
            <li>Chiffrement des mots de passe (bcrypt)</li>
            <li>Chiffrement des données sensibles en base</li>
          </ul>
        </div>

        <div class="measure-category">
          <h4>🛡️ Protection d'accès</h4>
          <ul>
            <li>Authentification sécurisée</li>
            <li>Limitation des tentatives de connexion</li>
            <li>Sessions avec timeout automatique</li>
            <li>Accès administrateur restreint et audité</li>
          </ul>
        </div>

        <div class="measure-category">
          <h4>📊 Surveillance</h4>
          <ul>
            <li>Monitoring de sécurité 24/7</li>
            <li>Logs d'audit des accès</li>
            <li>Détection d'anomalies</li>
            <li>Sauvegardes régulières et chiffrées</li>
          </ul>
        </div>
      </div>
    </section>

    <section id="droits">
      <h2>9. Vos droits</h2>
      
      <div class="rights-grid">
        <div class="right-item">
          <h4>👁️ Droit d'accès</h4>
          <p>Vous pouvez demander une copie de toutes les données personnelles que nous détenons sur vous.</p>
        </div>

        <div class="right-item">
          <h4>✏️ Droit de rectification</h4>
          <p>Vous pouvez corriger ou mettre à jour vos informations personnelles à tout moment.</p>
        </div>

        <div class="right-item">
          <h4>🗑️ Droit à l'effacement</h4>
          <p>Vous pouvez demander la suppression de vos données dans certaines conditions.</p>
        </div>

        <div class="right-item">
          <h4>⏸️ Droit à la limitation</h4>
          <p>Vous pouvez demander la limitation du traitement de vos données.</p>
        </div>

        <div class="right-item">
          <h4>📦 Droit à la portabilité</h4>
          <p>Vous pouvez récupérer vos données dans un format structuré et lisible.</p>
        </div>

        <div class="right-item">
          <h4>🚫 Droit d'opposition</h4>
          <p>Vous pouvez vous opposer au traitement de vos données dans certains cas.</p>
        </div>
      </div>

      <div class="rights-exercise">
        <h3>Comment exercer vos droits ?</h3>
        <p>Pour exercer vos droits, contactez-nous à <strong>privacy@gamerchallenges.com</strong> avec :</p>
        <ul>
          <li>Votre pseudonyme et email associé au compte</li>
          <li>Une description claire de votre demande</li>
          <li>Une pièce d'identité pour vérification</li>
        </ul>
        <p><strong>Délai de réponse :</strong> Nous répondons dans un délai de 30 jours maximum.</p>
      </div>
    </section>

    <section id="cookies">
      <h2>10. Cookies et technologies similaires</h2>
      
      <div class="cookies-info">
        <h3>Types de cookies utilisés :</h3>
        
        <div class="cookie-category">
          <h4>🔧 Cookies essentiels (obligatoires)</h4>
          <ul>
            <li><strong>Session d'authentification :</strong> Maintient votre connexion</li>
            <li><strong>Préférences d'interface :</strong> Sauvegarde vos paramètres d'affichage</li>
            <li><strong>Sécurité :</strong> Protection contre les attaques CSRF</li>
          </ul>
        </div>

        <div class="cookie-category">
          <h4>📊 Cookies analytiques (optionnels)</h4>
          <ul>
            <li><strong>Statistiques d'usage :</strong> Pages visitées, temps passé</li>
            <li><strong>Performance :</strong> Temps de chargement, erreurs</li>
            <li><strong>Fonctionnalités :</strong> Utilisation des fonctionnalités</li>
          </ul>
        </div>

        <div class="cookie-settings">
          <h4>⚙️ Gestion des cookies</h4>
          <p>Vous pouvez :</p>
          <ul>
            <li>Configurer vos préférences dans les paramètres de votre compte</li>
            <li>Désactiver les cookies non-essentiels dans votre navigateur</li>
            <li>Supprimer les cookies existants</li>
          </ul>
        </div>
      </div>
    </section>

    <section id="mineurs">
      <h2>11. Protection des mineurs</h2>
      
      <div class="minors-protection">
        <div class="age-requirements">
          <h4>📅 Conditions d'âge</h4>
          <ul>
            <li><strong>13-15 ans :</strong> Autorisation parentale requise</li>
            <li><strong>16+ ans :</strong> Inscription autonome autorisée</li>
            <li><strong>-13 ans :</strong> Accès interdit</li>
          </ul>
        </div>

        <div class="parental-controls">
          <h4>👨‍👩‍👧‍👦 Contrôles parentaux</h4>
          <ul>
            <li>Supervision des activités du mineur</li>
            <li>Droit de demander la suppression du compte</li>
            <li>Accès aux données collectées sur le mineur</li>
            <li>Paramètres de confidentialité renforcés par défaut</li>
          </ul>
        </div>

        <div class="reporting">
          <h4>🚨 Signalement</h4>
          <p>Si vous suspectez qu'un mineur utilise notre service sans autorisation appropriée, contactez-nous immédiatement à <strong>safety@gamerchallenges.com</strong>.</p>
        </div>
      </div>
    </section>

    <section id="transferts">
      <h2>12. Transferts internationaux</h2>
      
      <div class="transfers-info">
        <div class="data-location">
          <h4>🌍 Localisation des données</h4>
          <p>Vos données sont principalement stockées et traitées :</p>
          <ul>
            <li><strong>Union Européenne :</strong> Serveurs principaux</li>
            <li><strong>France :</strong> Données de sauvegarde</li>
          </ul>
        </div>

        <div class="third-party-services">
          <h4>🔗 Services tiers</h4>
          <p>Certains services peuvent impliquer des transferts :</p>
          <ul>
            <li><strong>CDN (Content Delivery Network) :</strong> Optimisation des performances</li>
            <li><strong>Services d'analyse :</strong> Statistiques anonymisées</li>
          </ul>
          <p><strong>Garanties :</strong> Tous les transferts respectent les clauses contractuelles types de l'UE ou des décisions d'adéquation.</p>
        </div>
      </div>
    </section>

    <section id="modifications">
      <h2>13. Modifications de la politique</h2>
      
      <div class="modifications-process">
        <h4>📝 Processus de modification</h4>
        <ol>
          <li><strong>Notification :</strong> Vous serez informé par email et via la plateforme</li>
          <li><strong>Délai :</strong> 30 jours minimum avant l'entrée en vigueur</li>
          <li><strong>Historique :</strong> Les versions précédentes restent consultables</li>
          <li><strong>Choix :</strong> Vous pouvez refuser les modifications en supprimant votre compte</li>
        </ol>

        <div class="version-info">
          <h4>📊 Informations de version</h4>
          <ul>
            <li><strong>Version actuelle :</strong> 2.0</li>
            <li><strong>Date d'entrée en vigueur :</strong> {lastUpdated}</li>
            <li><strong>Principales modifications :</strong> Mise en conformité RGPD, clarification des droits</li>
          </ul>
        </div>
      </div>
    </section>

    <section id="contact">
      <h2>14. Contact et réclamations</h2>
      
      <div class="contact-section">
        <div class="contact-methods">
          <div class="contact-method">
            <h4>📧 Délégué à la protection des données</h4>
            <p><strong>Email :</strong> <a href="mailto:privacy@gamerchallenges.com">privacy@gamerchallenges.com</a></p>
            <p><strong>Objet :</strong> "[RGPD] Votre demande"</p>
          </div>

          <div class="contact-method">
            <h4>🛡️ Questions de sécurité</h4>
            <p><strong>Email :</strong> <a href="mailto:security@gamerchallenges.com">security@gamerchallenges.com</a></p>
            <p><strong>Urgence :</strong> Réponse sous 24h</p>
          </div>

          <div class="contact-method">
            <h4>👨‍👩‍👧‍👦 Sécurité des mineurs</h4>
            <p><strong>Email :</strong> <a href="mailto:safety@gamerchallenges.com">safety@gamerchallenges.com</a></p>
            <p><strong>Priorité :</strong> Traitement immédiat</p>
          </div>
        </div>

        <div class="authority-contact">
          <h4>⚖️ Autorité de contrôle</h4>
          <p>Si vous n'êtes pas satisfait de notre réponse, vous pouvez saisir la Commission Nationale de l'Informatique et des Libertés (CNIL) :</p>
          <div class="cnil-info">
            <p><strong>Site web :</strong> <a href="https://www.cnil.fr" target="_blank" rel="noopener">www.cnil.fr</a></p>
            <p><strong>Adresse :</strong> 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07</p>
            <p><strong>Téléphone :</strong> 01 53 73 22 22</p>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div class="privacy-footer">
    <div class="footer-summary">
      <h3>📋 Résumé de vos droits</h3>
      <div class="rights-summary">
        <span class="right-badge">Accès</span>
        <span class="right-badge">Rectification</span>
        <span class="right-badge">Effacement</span>
        <span class="right-badge">Portabilité</span>
        <span class="right-badge">Opposition</span>
        <span class="right-badge">Limitation</span>
      </div>
    </div>
    
    <div class="footer-info">
      <p><strong>Dernière mise à jour :</strong> {lastUpdated}</p>
      <p><strong>Version :</strong> 2.0 - Cette politique est effective à compter de cette date.</p>
    </div>
    
    <div class="footer-links">
      <a href="/terms" class="btn btn-secondary">Conditions d'utilisation</a>
      <a href="/legal" class="btn btn-secondary">Mentions légales</a>
      <a href="/contact" class="btn btn-secondary">Nous contacter</a>
    </div>
  </div>
</div>

<style>
  .privacy-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
  }

  .privacy-header {
    text-align: center;
    margin-bottom: 3rem;
    padding: 3rem 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  }

  .privacy-header h1 {
    font-size: 2.8rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  .intro {
    font-size: 1.1rem;
    margin-top: 1rem;
    opacity: 0.95;
  }

  .privacy-nav {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    border-left: 5px solid #667eea;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  }

  .privacy-nav h3 {
    color: #667eea;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  .privacy-nav ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .privacy-nav a {
    color: #495057;
    text-decoration: none;
    padding: 0.5rem;
    border-radius: 6px;
    transition: all 0.3s ease;
    display: block;
  }

  .privacy-nav a:hover {
    background: #667eea;
    color: white;
    transform: translateX(5px);
  }

  .privacy-content section {
    margin-bottom: 3rem;
    padding: 2.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    border: 1px solid #e9ecef;
  }

  .privacy-content h2 {
    color: #667eea;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    border-bottom: 3px solid #667eea;
    padding-bottom: 0.5rem;
    position: relative;
  }

  .privacy-content h2::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 50px;
    height: 3px;
    background: #764ba2;
  }

  .privacy-content h3 {
    color: #495057;
    font-size: 1.4rem;
    margin: 2rem 0 1rem 0;
    border-left: 4px solid #667eea;
    padding-left: 1rem;
  }

  .privacy-content h4 {
    color: #6c757d;
    font-size: 1.2rem;
    margin: 1.5rem 0 0.5rem 0;
    font-weight: 600;
  }

  /* Composants spéciaux */
  .highlight-box {
    background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
    padding: 1.5rem;
    border-radius: 10px;
    border: 1px solid #667eea;
    margin: 1.5rem 0;
  }

  .contact-card {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 10px;
    border: 2px solid #dee2e6;
    margin: 1rem 0;
  }

  .data-grid, .purpose-grid, .rights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .data-category, .purpose-item, .right-item {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 10px;
    border: 1px solid #dee2e6;
    transition: all 0.3s ease;
  }

  .data-category:hover, .purpose-item:hover, .right-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
  }

  .data-category h4, .purpose-item h4, .right-item h4 {
    color: #667eea;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  .legal-basis {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .basis-item {
    background: linear-gradient(135deg, #fff, #f8f9fa);
    padding: 2rem;
    border-radius: 12px;
    border: 2px solid #e9ecef;
    text-align: center;
  }

  .sharing-info {
    margin: 2rem 0;
  }

  .no-sharing {
    background: linear-gradient(135deg, #d4edda, #c3e6cb);
    padding: 2rem;
    border-radius: 10px;
    border: 2px solid #28a745;
    text-align: center;
    margin-bottom: 2rem;
  }

  .sharing-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .case-item {
    background: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #dee2e6;
  }

  .retention-table {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    margin: 2rem 0;
  }

  .retention-row {
    display: grid;
    grid-template-columns: 2fr 1fr;
    border-bottom: 1px solid #dee2e6;
  }

  .retention-row:last-child {
    border-bottom: none;
  }

  .data-type, .duration {
    padding: 1rem 1.5rem;
  }

  .data-type {
    background: #f8f9fa;
    font-weight: 600;
    color: #495057;
  }

  .duration {
    background: white;
    color: #667eea;
    font-weight: 500;
    text-align: center;
  }

  .security-measures {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  .measure-category {
    background: linear-gradient(135deg, #fff, #f8f9fa);
    padding: 2rem;
    border-radius: 12px;
    border: 2px solid #e9ecef;
  }

  .measure-category h4 {
    color: #667eea;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  .rights-exercise {
    background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
    padding: 2rem;
    border-radius: 12px;
    border: 2px solid #667eea;
    margin: 2rem 0;
  }

  .cookies-info {
    margin: 2rem 0;
  }

  .cookie-category {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 10px;
    border: 1px solid #dee2e6;
    margin: 1rem 0;
  }

  .cookie-settings {
    background: linear-gradient(135deg, #fff3cd, #ffeaa7);
    padding: 2rem;
    border-radius: 12px;
    border: 2px solid #ffc107;
    margin: 2rem 0;
  }

  .minors-protection {
    margin: 2rem 0;
  }

  .age-requirements, .parental-controls, .reporting {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 10px;
    border: 1px solid #dee2e6;
    margin: 1.5rem 0;
  }

  .transfers-info {
    margin: 2rem 0;
  }

  .data-location, .third-party-services {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 10px;
    border: 1px solid #dee2e6;
    margin: 1.5rem 0;
  }

  .modifications-process {
    margin: 2rem 0;
  }

  .version-info {
    background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
    padding: 1.5rem;
    border-radius: 10px;
    border: 2px solid #667eea;
    margin: 2rem 0;
  }

  .contact-section {
    margin: 2rem 0;
  }

  .contact-methods {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .contact-method {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 12px;
    border: 2px solid #dee2e6;
    text-align: center;
  }

  .authority-contact {
    background: linear-gradient(135deg, #fff3cd, #ffeaa7);
    padding: 2rem;
    border-radius: 12px;
    border: 2px solid #ffc107;
    margin: 2rem 0;
  }

  .cnil-info {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    margin: 1rem 0;
  }

  .privacy-footer {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 3rem 2rem;
    border-radius: 15px;
    text-align: center;
    margin-top: 3rem;
  }

  .footer-summary {
    margin-bottom: 2rem;
  }

  .rights-summary {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin: 1rem 0;
  }

  .right-badge {
    background: rgba(255,255,255,0.2);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .footer-info {
    margin: 2rem 0;
    padding: 1rem;
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  .btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: rgba(255,255,255,0.2);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
    border: 2px solid rgba(255,255,255,0.3);
  }

  .btn:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-2px);
    text-decoration: none;
  }

  .btn-secondary {
    background: rgba(255,255,255,0.15);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .privacy-container {
      padding: 1rem;
    }

    .privacy-header {
      padding: 2rem 1rem;
    }

    .privacy-header h1 {
      font-size: 2.2rem;
    }

    .privacy-nav ul {
      grid-template-columns: 1fr;
    }

    .data-grid, .purpose-grid, .rights-grid {
      grid-template-columns: 1fr;
    }

    .retention-row {
      grid-template-columns: 1fr;
    }

    .data-type, .duration {
      text-align: center;
    }

    .security-measures {
      grid-template-columns: 1fr;
    }

    .contact-methods {
      grid-template-columns: 1fr;
    }

    .footer-links {
      flex-direction: column;
      align-items: center;
    }

    .rights-summary {
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .privacy-header h1 {
      font-size: 1.8rem;
    }

    .privacy-content section {
      padding: 1.5rem;
    }

    .privacy-content h2 {
      font-size: 1.6rem;
    }
  }

  /* Smooth scroll behavior */
  html {
    scroll-behavior: smooth;
  }

  /* Highlight target section */
  section:target {
    background: linear-gradient(135deg, #f0f7ff, #e3f2fd);
    transform: scale(1.02);
    transition: all 0.5s ease;
  }

  /* Animation d'entrée */
  .privacy-container {
    animation: fadeInUp 0.8s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Améliorations d'accessibilité */
  a {
    color: #667eea;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #5a6fd8;
  }

  a:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
  }

  /* Style pour les listes */
  ul {
    padding-left: 1.5rem;
  }

  li {
    margin: 0.5rem 0;
  }

  /* Style pour les liens email */
  a[href^="mailto:"] {
    font-weight: 600;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Style pour les paragraphes importants */
  strong {
    color: #495057;
  }

  /* Effet de hover sur les sections */
  .privacy-content section:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
    transition: all 0.3s ease;
  }
</style>