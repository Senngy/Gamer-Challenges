<script>
  import { onMount } from 'svelte';

  // Fonction de navigation fluide pour les ancres
  onMount(() => {
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
  <title>Mentions Légales - GamerChallenges</title>
  <meta name="description" content="Mentions légales et informations légales de GamerChallenges. Informations sur l'éditeur, l'hébergeur, la propriété intellectuelle et vos droits." />
  <meta name="keywords" content="mentions légales, informations légales, éditeur, GamerChallenges, gaming, défis" />
</svelte:head>

<div class="legal-container">
  <div class="legal-header">
    <h1>📋 Mentions Légales</h1>
    <p class="last-updated">Dernière mise à jour : 15 juillet 2025</p>
  </div>

  <div class="legal-nav">
    <h3>📑 Sommaire</h3>
    <ul>
      <li><a href="#editeur">1. Informations sur l'éditeur</a></li>
      <li><a href="#hebergement">2. Hébergement</a></li>
      <li><a href="#directeur-publication">3. Directeur de publication</a></li>
      <li><a href="#conception-realisation">4. Conception et réalisation</a></li>
      <li><a href="#propriete-intellectuelle">5. Propriété intellectuelle</a></li>
      <li><a href="#responsabilite">6. Responsabilité</a></li>
      <li><a href="#donnees-personnelles">7. Protection des données personnelles</a></li>
      <li><a href="#cookies">8. Politique des cookies</a></li>
      <li><a href="#droit-applicable">9. Droit applicable et juridiction</a></li>
      <li><a href="#contact">10. Contact</a></li>
      <li><a href="#credibilite">11. Crédits et remerciements</a></li>
    </ul>
  </div>

  <div class="legal-content">
    <section id="editeur">
      <h2>1. Informations sur l'éditeur</h2>
      <div class="info-box">
        <h3>Identification du site</h3>
        <p><strong>Nom du site :</strong> GamerChallenges</p>
        <p><strong>URL :</strong> <a href="https://gamerchallenges.com" target="_blank">https://gamerchallenges.com</a></p>
        <p><strong>Nature du site :</strong> Plateforme communautaire de défis gaming</p>
      </div>
      
      <div class="info-box">
        <h3>Éditeur responsable</h3>
        <p><strong>Nom :</strong> Lamine Boumaza</p>
        <p><strong>Statut :</strong> Étudiant - Projet pédagogique</p>
        <p><strong>Formation :</strong> Développeur Web Full Stack</p>
        <p><strong>École :</strong> O'Clock</p>
        <p><strong>Email :</strong> <a href="mailto:lamine@gamerchallenges.com">lamine@gamerchallenges.com</a></p>
      </div>

      <div class="warning-box">
        <h4>⚠️ Avertissement important</h4>
        <p>Ce site web est un <strong>projet étudiant</strong> réalisé dans le cadre d'un cursus de formation en développement web à l'école O'Clock. Il n'a pas de vocation commerciale et est destiné uniquement à des fins pédagogiques et de démonstration de compétences techniques.</p>
      </div>
    </section>

    <section id="hebergement">
      <h2>2. Hébergement</h2>
      <div class="info-box">
        <h3>Prestataire d'hébergement</h3>
        <p><strong>Hébergeur :</strong> À compléter selon le déploiement</p>
        <p><em>Exemples courants pour projets étudiants :</em></p>
        <ul>
          <li><strong>Vercel :</strong> Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
          <li><strong>Netlify :</strong> Netlify, Inc., 2325 3rd Street, Suite 296, San Francisco, CA 94107, USA</li>
          <li><strong>GitHub Pages :</strong> GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA</li>
          <li><strong>Railway :</strong> Railway Corp., 1519 Robson Street, Vancouver, BC V6G 1C3, Canada</li>
        </ul>
      </div>
    </section>

    <section id="directeur-publication">
      <h2>3. Directeur de publication</h2>
      <p><strong>Directeur de la publication :</strong> Lamine Boumaza</p>
      <p><strong>Responsabilité éditoriale :</strong> Le directeur de publication est responsable du contenu éditorial du site conformément à la loi sur la liberté de la presse du 29 juillet 1881.</p>
    </section>

    <section id="conception-realisation">
      <h2>4. Conception et réalisation</h2>
      <div class="team-box">
        <h3>Équipe de développement</h3>
        <p><strong>Chef de projet :</strong> Lamine Boumaza</p>
        <p><strong>Développement :</strong> Projet collaboratif étudiant</p>
        <p><strong>Technologies utilisées :</strong></p>
        <ul>
          <li><strong>Frontend :</strong> SvelteKit, HTML5, CSS3, JavaScript</li>
          <li><strong>Backend :</strong> Node.js, Express.js</li>
          <li><strong>Base de données :</strong> PostgreSQL</li>
          <li><strong>Outils :</strong> Git, GitHub, VS Code</li>
        </ul>
      </div>
    </section>

    <section id="propriete-intellectuelle">
      <h2>5. Propriété intellectuelle</h2>
      
      <h3>5.1 Contenu du site</h3>
      <p>L'ensemble des contenus présents sur le site GamerChallenges (textes, images, graphismes, logo, icônes, sons, logiciels, etc.) sont protégés par les dispositions du Code de la Propriété Intellectuelle et par les conventions internationales relatives au droit d'auteur.</p>
      
      <h3>5.2 Droits d'utilisation</h3>
      <p>La reproduction, la représentation, la modification, la publication, l'adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l'éditeur.</p>
      
      <h3>5.3 Marques et logos</h3>
      <p>Les marques, logos, noms de domaine, produits ou services cités sur le site sont la propriété de leurs titulaires respectifs.</p>
      
      <h3>5.4 Contenu utilisateur</h3>
      <p>Les utilisateurs conservent leurs droits de propriété intellectuelle sur les contenus qu'ils publient. Cependant, en publiant du contenu sur GamerChallenges, ils accordent à la plateforme une licence d'utilisation dans le cadre du fonctionnement du service.</p>

      <h3>5.5 Images et ressources tierces</h3>
      <p>Les images de jeux vidéo utilisées sur le site appartiennent à leurs éditeurs respectifs et sont utilisées uniquement à des fins d'illustration dans un cadre pédagogique.</p>
    </section>

    <section id="responsabilite">
      <h2>6. Responsabilité</h2>
      
      <h3>6.1 Limitations de responsabilité</h3>
      <p>GamerChallenges étant un projet étudiant, l'éditeur ne saurait être tenu responsable :</p>
      <ul>
        <li>Des dommages directs ou indirects causés au matériel de l'utilisateur lors de l'accès au site</li>
        <li>Des dysfonctionnements, interruptions ou indisponibilités du site</li>
        <li>De l'utilisation que pourrait faire un utilisateur des informations contenues sur le site</li>
        <li>Du contenu des sites externes vers lesquels le site pourrait renvoyer</li>
      </ul>
      
      <h3>6.2 Disponibilité du service</h3>
      <p>Le site est accessible 24h/24 et 7j/7, sous réserve des interruptions programmées pour maintenance ou en cas de force majeure. L'éditeur ne garantit pas la continuité permanente du service.</p>
      
      <h3>6.3 Contenu utilisateur</h3>
      <p>L'éditeur n'exerce aucun contrôle a priori sur le contenu publié par les utilisateurs et ne saurait être tenu responsable de ce contenu. Cependant, tout contenu manifestement illicite sera retiré dès que l'éditeur en aura connaissance.</p>
    </section>

    <section id="donnees-personnelles">
      <h2>7. Protection des données personnelles</h2>
      
      <h3>7.1 Responsable du traitement</h3>
      <p>Le responsable du traitement des données personnelles est Lamine Boumaza, en sa qualité d'éditeur du site.</p>
      
      <h3>7.2 Finalités du traitement</h3>
      <p>Les données personnelles collectées sont utilisées exclusivement pour :</p>
      <ul>
        <li>La gestion des comptes utilisateurs</li>
        <li>Le fonctionnement de la plateforme de défis</li>
        <li>L'amélioration de l'expérience utilisateur</li>
        <li>La sécurité du site</li>
      </ul>
      
      <h3>7.3 Base légale</h3>
      <p>Le traitement des données est basé sur :</p>
      <ul>
        <li>Le consentement de l'utilisateur pour l'inscription</li>
        <li>L'exécution du contrat pour les services proposés</li>
        <li>L'intérêt légitime pour la sécurité et l'amélioration du service</li>
      </ul>
      
      <h3>7.4 Droits des utilisateurs</h3>
      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul>
        <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données</li>
        <li><strong>Droit de rectification :</strong> Corriger vos données inexactes</li>
        <li><strong>Droit à l'effacement :</strong> Supprimer vos données</li>
        <li><strong>Droit à la portabilité :</strong> Récupérer vos données dans un format structuré</li>
        <li><strong>Droit d'opposition :</strong> Vous opposer au traitement</li>
        <li><strong>Droit à la limitation :</strong> Limiter le traitement de vos données</li>
      </ul>
      
      <h3>7.5 Conservation des données</h3>
      <p>Les données sont conservées pendant la durée strictement nécessaire aux finalités pour lesquelles elles ont été collectées. En cas de suppression de compte, les données sont effacées dans un délai maximum de 30 jours.</p>
      
      <h3>7.6 Sécurité</h3>
      <p>Des mesures techniques et organisationnelles appropriées sont mises en œuvre pour protéger vos données contre la perte, l'usage non autorisé, la modification ou la divulgation.</p>
    </section>

    <section id="cookies">
      <h2>8. Politique des cookies</h2>
      
      <h3>8.1 Qu'est-ce qu'un cookie ?</h3>
      <p>Un cookie est un petit fichier texte stocké sur votre ordinateur lors de la visite d'un site web. Il permet au site de mémoriser certaines informations sur votre visite.</p>
      
      <h3>8.2 Types de cookies utilisés</h3>
      <div class="cookies-info">
        <h4>🔧 Cookies techniques (obligatoires)</h4>
        <ul>
          <li><strong>Session :</strong> Maintien de la connexion utilisateur</li>
          <li><strong>Préférences :</strong> Sauvegarde des paramètres utilisateur</li>
          <li><strong>Sécurité :</strong> Protection contre les attaques CSRF</li>
        </ul>
        
        <h4>📊 Cookies analytiques (optionnels)</h4>
        <ul>
          <li><strong>Usage :</strong> Statistiques d'utilisation anonymisées</li>
          <li><strong>Performance :</strong> Amélioration de l'expérience utilisateur</li>
        </ul>
      </div>
      
      <h3>8.3 Gestion des cookies</h3>
      <p>Vous pouvez configurer votre navigateur pour :</p>
      <ul>
        <li>Accepter ou refuser les cookies</li>
        <li>Être informé de leur dépôt</li>
        <li>Les supprimer régulièrement</li>
      </ul>
      
      <div class="warning-box">
        <p><strong>Note :</strong> La désactivation des cookies techniques peut affecter le bon fonctionnement du site.</p>
      </div>
    </section>

    <section id="droit-applicable">
      <h2>9. Droit applicable et juridiction</h2>
      
      <h3>9.1 Droit applicable</h3>
      <p>Les présentes mentions légales sont soumises au droit français. En cas de litige et à défaut d'accord amiable, le différend sera porté devant les tribunaux français compétents.</p>
      
      <h3>9.2 Règlement des litiges</h3>
      <p>En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. Vous pouvez nous contacter à l'adresse email indiquée ci-dessous.</p>
      
      <h3>9.3 Médiation</h3>
      <p>Conformément à l'article L.612-1 du Code de la consommation, nous adhérons au dispositif de médiation mis en place pour les litiges de consommation.</p>
    </section>

    <section id="contact">
      <h2>10. Contact</h2>
      <div class="contact-box">
        <h3>📧 Nous contacter</h3>
        <div class="contact-methods">
          <div class="contact-method">
            <h4>Questions générales</h4>
            <p><strong>Email :</strong> <a href="mailto:contact@gamerchallenges.com">contact@gamerchallenges.com</a></p>
          </div>
          
          <div class="contact-method">
            <h4>Questions légales</h4>
            <p><strong>Email :</strong> <a href="mailto:legal@gamerchallenges.com">legal@gamerchallenges.com</a></p>
          </div>
          
          <div class="contact-method">
            <h4>Protection des données</h4>
            <p><strong>Email :</strong> <a href="mailto:privacy@gamerchallenges.com">privacy@gamerchallenges.com</a></p>
          </div>
          
          <div class="contact-method">
            <h4>Support technique</h4>
            <p><strong>Email :</strong> <a href="mailto:support@gamerchallenges.com">support@gamerchallenges.com</a></p>
          </div>
        </div>
        
        <div class="response-time">
          <p><strong>⏱️ Délai de réponse :</strong> Nous nous engageons à répondre dans un délai maximum de 72 heures (jours ouvrés).</p>
        </div>
      </div>
    </section>

    <section id="credibilite">
      <h2>11. Crédits et remerciements</h2>
      
      <h3>11.1 Formation et encadrement</h3>
      <div class="credits-box">
        <p><strong>École :</strong> O'Clock - École de développement web</p>
        <p><strong>Formation :</strong> Développeur Web Full Stack</p>
        <p><strong>Période :</strong> 2025</p>
        <p><strong>Remerciements :</strong> À l'équipe pédagogique d'O'Clock pour l'accompagnement et les conseils tout au long de ce projet.</p>
      </div>
      
      <h3>11.2 Technologies et outils</h3>
      <div class="tech-credits">
        <p>Ce projet a été réalisé grâce aux technologies open source suivantes :</p>
        <ul>
          <li><strong>SvelteKit :</strong> Framework front-end</li>
          <li><strong>Node.js :</strong> Environnement d'exécution JavaScript</li>
          <li><strong>PostgreSQL :</strong> Système de gestion de base de données</li>
          <li><strong>Express.js :</strong> Framework web pour Node.js</li>
        </ul>
      </div>
      
      <h3>11.3 Ressources visuelles</h3>
      <p>Les images et icônes utilisées proviennent de :</p>
      <ul>
        <li>Ressources libres de droits</li>
        <li>Créations originales de l'équipe</li>
        <li>Images officielles des jeux (usage pédagogique)</li>
      </ul>
    </section>
  </div>

  <div class="legal-footer">
    <div class="footer-content">
      <p><strong>🎓 Projet pédagogique - O'Clock</strong></p>
      <p>Ces mentions légales ont été rédigées dans un cadre éducatif et sont adaptées à un projet étudiant.</p>
      <p class="last-update">Dernière mise à jour : 15 juillet 2025</p>
    </div>
  </div>
</div>

<style>
  .legal-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 2rem;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
  }

  .legal-header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #4a9eff;
  }

  .legal-header h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #4a9eff;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  .last-updated {
    font-style: italic;
    color: #b0c4de;
    font-size: 1.1rem;
  }

  .legal-nav {
    background: rgba(74, 158, 255, 0.1);
    padding: 2rem;
    border-radius: 8px;
    margin-bottom: 3rem;
    border-left: 4px solid #4a9eff;
  }

  .legal-nav h3 {
    color: #4a9eff;
    margin-bottom: 1.5rem;
    font-size: 1.4rem;
  }

  .legal-nav ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 0.8rem;
  }

  .legal-nav li {
    margin: 0;
  }

  .legal-nav a {
    color: #ffffff;
    text-decoration: none;
    padding: 0.8rem 1rem;
    display: block;
    border-radius: 6px;
    transition: all 0.3s ease;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
  }

  .legal-nav a:hover {
    background: rgba(74, 158, 255, 0.2);
    border-color: #4a9eff;
    transform: translateX(5px);
  }

  .legal-content section {
    margin-bottom: 4rem;
    padding: 2rem;
    background: rgba(255,255,255,0.05);
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.1);
  }

  .legal-content h2 {
    color: #4a9eff;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #4a9eff;
    position: relative;
  }

  .legal-content h2::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 50px;
    height: 2px;
    background: linear-gradient(90deg, #4a9eff, transparent);
  }

  .legal-content h3 {
    color: #87ceeb;
    font-size: 1.4rem;
    margin: 2rem 0 1rem 0;
  }

  .legal-content h4 {
    color: #b0c4de;
    font-size: 1.2rem;
    margin: 1.5rem 0 0.8rem 0;
  }

  .legal-content p {
    margin-bottom: 1rem;
    text-align: justify;
  }

  .legal-content ul {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  .legal-content li {
    margin-bottom: 0.5rem;
  }

  .legal-content a {
    color: #4a9eff;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .legal-content a:hover {
    color: #87ceeb;
    text-decoration: underline;
  }

  .info-box, .warning-box, .team-box, .cookies-info, .contact-box, .credits-box, .tech-credits {
    background: rgba(0,0,0,0.2);
    padding: 1.5rem;
    border-radius: 8px;
    margin: 1.5rem 0;
    border-left: 4px solid #4a9eff;
  }

  .warning-box {
    border-left-color: #ff6b35;
    background: rgba(255, 107, 53, 0.1);
  }

  .warning-box h4 {
    color: #ff6b35;
  }

  .contact-methods {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .contact-method {
    background: rgba(255,255,255,0.05);
    padding: 1.5rem;
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.1);
  }

  .contact-method h4 {
    color: #4a9eff;
    margin-bottom: 0.8rem;
  }

  .response-time {
    background: rgba(74, 158, 255, 0.1);
    padding: 1rem;
    border-radius: 6px;
    margin-top: 1.5rem;
    border: 1px solid rgba(74, 158, 255, 0.3);
  }

  .legal-footer {
    text-align: center;
    margin-top: 3rem;
    padding: 2rem;
    background: rgba(0,0,0,0.3);
    border-radius: 8px;
    border-top: 3px solid #4a9eff;
  }

  .footer-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .footer-content p {
    margin-bottom: 0.5rem;
  }

  .last-update {
    font-style: italic;
    color: #b0c4de;
    font-size: 0.9rem;
  }

  /* Responsive Design */
  @media (max-width: 480px) {
    .legal-container {
      padding: 1rem;
      margin: 1rem;
    }

    .legal-header h1 {
      font-size: 2.2rem;
    }

    .legal-nav ul {
      grid-template-columns: 1fr;
    }

    .legal-content section {
      padding: 1.5rem;
    }

    .legal-content h2 {
      font-size: 1.6rem;
    }

    .contact-methods {
      grid-template-columns: 1fr;
    }
  }
</style>