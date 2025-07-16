<script>
  import { onMount } from 'svelte';
  
  let stats = {
    challenges: 150,
    users: 1200,
    games: 45,
    participations: 3500
  };

  let teamMembers = [
    {
      name: "Lamine BOUMAZA",
      role: "Développeur Full-Stack",
      description: "Passionné de développement web et de gaming.",
      skills: ["HTML", "CSS", "JavaScript", "Svelte & SvelteKit", "Node.js", "Express", "PostgreSQL",  "Sequelize"],
      avatar: "/images/lamine.jpeg"
    },
    {
      name: "Thomas BRELOT",
      role: "Designer UI/UX",
      description: "Experte en design d'interface et expérience utilisateur, spécialisée dans l'univers gaming.",
      skills: ["Figma", "UI Design", "Responsive Design", "UX Research", "Prototypage", "Design System"],
      avatar: "/images/thomas.png"
    },
    {
      name: "Sylvain MARCHAL",
      role: "Développeur Back-End",
      description: "Spécialiste des APIs et de l'architecture serveur, garant de la performance et de la sécurité.",
      skills: ["Node.js", "Express", "PostgreSQL", "Docker", "API REST", "Sécurité"],
      avatar: "/images/sylvain.png"
    },
    {
    name: "Samuel DUTHOIT",
    role: "Développeur Front-End",
    description: "Un chouïa de connsaissance en développement d'interfaces gaming interactives.",
    skills: ["Svelte & SvelteKit", "JavaScript ES6+", "CSS & Animations", "WebGL", "Performance Web", "Progressive Web Apps", "Git"],
    avatar: "/images/samuel.png"
    }
  ];

  let technologies = [
    { name: "SvelteKit", category: "Frontend", icon: "🔥" },
    { name: "Node.js", category: "Backend", icon: "⚙️" },
    { name: "PostgreSQL", category: "Base de données", icon: "🐘" },
    { name: "Sequelize", category: "ORM & POO", icon: "🧠" },
    { name: "CSS", category: "Styling", icon: "🎨" },
    { name: "JavaScript", category: "Logique", icon: "⚡" },
  ];

  onMount(() => {
    // Animation des statistiques
    const animateStats = () => {
      const statElements = document.querySelectorAll('.stat-number');
      statElements.forEach(element => {
        const target = parseInt(element.dataset.target);
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          element.textContent = Math.floor(current).toLocaleString();
        }, 20);
      });
    };

    // Observer pour déclencher l'animation quand la section est visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    });

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) observer.observe(statsSection);
  });
</script>

<svelte:head>
  <title>À propos - GamerChallenges</title>
  <meta name="description" content="Découvrez GamerChallenges, la plateforme communautaire dédiée aux passionnés de jeux vidéo. Créez, relevez et partagez des challenges gaming avec une communauté active." />
  <meta name="robots" content="index, follow" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
</svelte:head>

<div class="about-container">
  <!-- Hero Section -->
  <div class="hero-section">
    <div class="hero-content">
      <h1>À propos de GamerChallenges</h1>
      <p class="hero-subtitle">La plateforme communautaire qui transforme votre passion gaming en défis épiques</p>
      <div class="hero-badges">
        <span class="badge">🎮 Gaming</span>
        <span class="badge">🏆 Challenges</span>
        <span class="badge">👥 Communauté</span>
        <span class="badge">🚀 Innovation</span>
      </div>
    </div>
    <div class="hero-visual">
      <div class="floating-elements">
        <div class="floating-element">🎯</div>
        <div class="floating-element">🏅</div>
        <div class="floating-element">⚡</div>
        <div class="floating-element">🎮</div>
      </div>
    </div>
  </div>

  <!-- Statistics Section -->
  <section class="stats-section">
    <h2>Notre impact en chiffres</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">🏆</div>
        <div class="stat-number" data-target="{stats.challenges}">0</div>
        <div class="stat-label">Challenges créés</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-number" data-target="{stats.users}">0</div>
        <div class="stat-label">Gamers inscrits</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🎮</div>
        <div class="stat-number" data-target="{stats.games}">0</div>
        <div class="stat-label">Jeux supportés</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">⚡</div>
        <div class="stat-number" data-target="{stats.participations}">0</div>
        <div class="stat-label">Participations</div>
      </div>
    </div>
  </section>

  <!-- Mission Section -->
  <section class="mission-section">
    <div class="mission-content">
      <h2>Notre mission</h2>
      <div class="mission-grid">
        <div class="mission-card">
          <div class="mission-icon">🎯</div>
          <h3>Créer des liens</h3>
          <p>Rassembler les passionnés de gaming autour de défis créatifs et stimulants qui favorisent l'entraide et la convivialité.</p>
        </div>
        <div class="mission-card">
          <div class="mission-icon">🚀</div>
          <h3>Innover ensemble</h3>
          <p>Encourager la créativité et l'innovation dans la communauté gaming à travers des challenges originaux et diversifiés.</p>
        </div>
        <div class="mission-card">
          <div class="mission-icon">🌟</div>
          <h3>Valoriser les talents</h3>
          <p>Mettre en lumière les compétences et les réussites de chaque joueur grâce à un système de reconnaissance équitable.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="features-section">
    <h2>Fonctionnalités principales</h2>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-header">
          <div class="feature-icon">🎮</div>
          <h3>Création de challenges</h3>
        </div>
        <p>Concevez des défis personnalisés sur vos jeux favoris avec des objectifs clairs et des règles détaillées.</p>
        <ul class="feature-list">
          <li>Interface intuitive de création</li>
          <li>Support multi-jeux</li>
          <li>Paramètres de difficulté</li>
          <li>Validation automatique</li>
        </ul>
      </div>

      <div class="feature-card">
        <div class="feature-header">
          <div class="feature-icon">🏆</div>
          <h3>Système de progression</h3>
        </div>
        <p>Suivez vos performances et progressez dans les classements grâce à un système de points et de badges.</p>
        <ul class="feature-list">
          <li>Suivi détaillé des performances</li>
          <li>Badges de réussite</li>
          <li>Classements dynamiques</li>
          <li>Statistiques personnelles</li>
        </ul>
      </div>

      <div class="feature-card">
        <div class="feature-header">
          <div class="feature-icon">👥</div>
          <h3>Interactions sociales</h3>
        </div>
        <p>Interagissez avec la communauté via les likes, commentaires et partages de vos exploits gaming.</p>
        <ul class="feature-list">
          <li>Système de likes</li>
          <li>Profils personnalisables</li>
          <li>Partage d'achievements</li>
          <li>Communauté active</li>
        </ul>
      </div>

      <div class="feature-card">
        <div class="feature-header">
          <div class="feature-icon">📱</div>
          <h3>Interface moderne</h3>
        </div>
        <p>Profitez d'une expérience utilisateur optimisée, responsive et pensée spécifiquement pour les gamers.</p>
        <ul class="feature-list">
          <li>Design responsive</li>
          <li>Navigation intuitive</li>
          <li>Thème gaming</li>
          <li>Performance optimisée</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Values Section -->
  <section class="values-section">
    <h2>Nos valeurs fondamentales</h2>
    <div class="values-grid">
      <div class="value-card">
        <div class="value-icon">🤝</div>
        <h3>Communauté</h3>
        <p>Nous croyons en la force de la communauté gaming pour créer des expériences enrichissantes et durables.</p>
      </div>
      <div class="value-card">
        <div class="value-icon">💡</div>
        <h3>Créativité</h3>
        <p>Nous encourageons l'innovation et l'originalité dans la création de challenges et d'expériences gaming.</p>
      </div>
      <div class="value-card">
        <div class="value-icon">🌐</div>
        <h3>Accessibilité</h3>
        <p>Notre plateforme est conçue pour être accessible à tous, quel que soit le niveau ou l'expérience.</p>
      </div>
      <div class="value-card">
        <div class="value-icon">🛡️</div>
        <h3>Respect</h3>
        <p>Nous garantissons un environnement sain, inclusif et respectueux de la vie privée de chacun.</p>
      </div>
    </div>
  </section>

  <!-- Team Section -->
  <section class="team-section">
    <h2>Notre équipe</h2>
    <div class="team-intro">
      <p>GamerChallenges est né de la passion d'étudiants développeurs pour le gaming et les technologies web modernes.</p>
    </div>
    <div class="team-grid">
      {#each teamMembers as member}
        <div class="team-card">
          <div class="team-avatar">
            <img src="{member.avatar}" alt="{member.name}" />
            <div class="team-badge">👨‍💻</div>
          </div>
          <div class="team-info">
            <h3>{member.name}</h3>
            <p class="team-role">{member.role}</p>
            <p class="team-description">{member.description}</p>
            <div class="team-skills">
              {#each member.skills as skill}
                <span class="skill-tag">{skill}</span>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Technology Section -->
  <section class="tech-section">
    <h2>Technologies & conception</h2>
    <div class="tech-intro">
      <p>GamerChallenges est développé avec des technologies modernes pour garantir performance, sécurité et évolutivité.</p>
    </div>
    <div class="tech-grid">
      {#each technologies as tech}
        <div class="tech-card">
          <div class="tech-icon">{tech.icon}</div>
          <h3>{tech.name}</h3>
          <p class="tech-category">{tech.category}</p>
        </div>
      {/each}
    </div>
    
    <div class="development-process">
      <h3>Processus de développement</h3>
      <div class="process-steps">
        <div class="process-step">
          <div class="step-number">1</div>
          <h4>Analyse & Conception</h4>
          <p>Modélisation MCD/MLD/MPD et wireframes</p>
        </div>
        <div class="process-step">
          <div class="step-number">2</div>
          <h4>Design UI/UX</h4>
          <p>Charte graphique et maquettes gaming</p>
        </div>
        <div class="process-step">
          <div class="step-number">3</div>
          <h4>Développement</h4>
          <p>Code full-stack et intégration</p>
        </div>
        <div class="process-step">
          <div class="step-number">4</div>
          <h4>Tests & Déploiement</h4>
          <p>Validation et mise en production</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Future Section -->
  <section class="future-section">
    <h2>Contexte & perspectives d'avenir</h2>
    <div class="future-content">
      <div class="context-card">
        <h3>📚 Projet étudiant</h3>
        <p>GamerChallenges a été développé dans le cadre de la formation O'Clock comme projet de fin d'études (Apothéose). Il représente l'aboutissement de plusieurs mois d'apprentissage et de développement.</p>
      </div>
      
      <div class="mvp-card">
        <h3>🚀 MVP en évolution</h3>
        <p>Cette version constitue un Minimum Viable Product avec les fonctionnalités essentielles. Elle pose les bases solides pour les évolutions futures.</p>
      </div>
    </div>

    <div class="roadmap">
      <h3>🛣️ Feuille de route</h3>
      <div class="roadmap-grid">
        <div class="roadmap-item">
          <div class="roadmap-icon">💬</div>
          <h4>Système de commentaires</h4>
          <p>Discussions et échanges sur les challenges</p>
        </div>
        <div class="roadmap-item">
          <div class="roadmap-icon">🔍</div>
          <h4>Filtres avancés</h4>
          <p>Recherche et tri sophistiqués</p>
        </div>
        <div class="roadmap-item">
          <div class="roadmap-icon">🏅</div>
          <h4>Système de récompenses</h4>
          <p>Badges et achievements étendus</p>
        </div>
        <div class="roadmap-item">
          <div class="roadmap-icon">📊</div>
          <h4>Analytics avancées</h4>
          <p>Statistiques détaillées et insights</p>
        </div>
        <div class="roadmap-item">
          <div class="roadmap-icon">🔔</div>
          <h4>Notifications</h4>
          <p>Alertes en temps réel</p>
        </div>
        <div class="roadmap-item">
          <div class="roadmap-icon">🌍</div>
          <h4>Internationalisation</h4>
          <p>Support multi-langues</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact CTA -->
  <section class="cta-section">
    <div class="cta-content">
      <h2>Rejoignez l'aventure GamerChallenges</h2>
      <p>Prêt à relever des défis et à repousser vos limites gaming ?</p>
      <div class="cta-buttons">
        <a href="/auth/register" class="btn btn-primary">Créer un compte</a>
        <a href="/games" class="btn btn-secondary">Découvrir nos jeux</a>
      </div>
    </div>
  </section>
</div>

<style>
  .about-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
  }

  /* Hero Section */
  .hero-section {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
    align-items: center;
    padding: 4rem 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    margin-bottom: 4rem;
    color: white;
    overflow: hidden;
    position: relative;
  }

  .hero-content {
    padding: 0 3rem;
  }

  .hero-content h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #fff, #f0f0f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: 1.3rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .hero-badges {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .badge {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-size: 0.9rem;
    backdrop-filter: blur(10px);
  }

  .hero-visual {
    position: relative;
    height: 300px;
  }

  .floating-elements {
    position: relative;
    height: 100%;
  }

  .floating-element {
    position: absolute;
    font-size: 3rem;
    animation: float 6s ease-in-out infinite;
  }

  .floating-element:nth-child(1) { top: 10%; left: 20%; animation-delay: 0s; }
  .floating-element:nth-child(2) { top: 60%; left: 10%; animation-delay: 1.5s; }
  .floating-element:nth-child(3) { top: 30%; right: 30%; animation-delay: 3s; }
  .floating-element:nth-child(4) { bottom: 20%; right: 10%; animation-delay: 4.5s; }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(10deg); }
  }

  /* Statistics Section */
  .stats-section {
    text-align: center;
    margin-bottom: 4rem;
  }

  .stats-section h2 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: #667eea;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .stat-card {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    text-align: center;
    transition: transform 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-10px);
  }

  .stat-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: 800;
    color: #667eea;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: #6c757d;
    font-weight: 500;
  }

  /* Mission Section */
  .mission-section {
    margin-bottom: 4rem;
  }

  .mission-section h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    color: #667eea;
  }

  .mission-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .mission-card {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    padding: 2.5rem;
    border-radius: 15px;
    text-align: center;
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }

  .mission-card:hover {
    border-color: #667eea;
    transform: translateY(-5px);
  }

  .mission-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }

  .mission-card h3 {
    color: #667eea;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  /* Features Section */
  .features-section {
    margin-bottom: 4rem;
  }

  .features-section h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    color: #667eea;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }

  .feature-card {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  }

  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
  }

  .feature-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .feature-icon {
    font-size: 2rem;
    margin-right: 1rem;
  }

  .feature-card h3 {
    color: #667eea;
    font-size: 1.3rem;
    margin: 0;
  }

  .feature-list {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
  }

  .feature-list li {
    padding: 0.3rem 0;
    color: #6c757d;
  }

  .feature-list li::before {
    content: "✓";
    color: #28a745;
    font-weight: bold;
    margin-right: 0.5rem;
  }

  /* Values Section */
  .values-section {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    padding: 3rem;
    border-radius: 20px;
    margin-bottom: 4rem;
  }

  .values-section h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    color: #667eea;
  }

  .values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .value-card {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  }

  .value-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .value-card h3 {
    color: #667eea;
    margin-bottom: 1rem;
  }

  /* Team Section */
  .team-section {
    margin-bottom: 4rem;
  }

  .team-section h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 2rem;
    color: #667eea;
  }

  .team-intro {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 1.1rem;
    color: #6c757d;
  }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    justify-content: center;
  }

  .team-card {
    background: white;
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    text-align: center;
    max-width: 400px;
    margin: 0 auto;
  }

  .team-avatar {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto 1.5rem;
  }

  .team-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #667eea;
  }

  .team-badge {
    position: absolute;
    bottom: 0;
    right: 0;
    background: #667eea;
    color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }

  .team-info h3 {
    color: #667eea;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .team-role {
    color: #6c757d;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .team-description {
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .team-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }

  .skill-tag {
    background: #667eea;
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  /* Technology Section */
  .tech-section {
    margin-bottom: 4rem;
  }

  .tech-section h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 2rem;
    color: #667eea;
  }

  .tech-intro {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 1.1rem;
    color: #6c757d;
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .tech-card {
    background: white;
    padding: 1.5rem;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    transition: transform 0.3s ease;
  }

  .tech-card:hover {
    transform: translateY(-5px);
  }

  .tech-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .tech-card h3 {
    color: #667eea;
    margin-bottom: 0.5rem;
  }

  .tech-category {
    color: #6c757d;
    font-size: 0.9rem;
  }

  .development-process {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    padding: 2.5rem;
    border-radius: 15px;
    margin-top: 3rem;
  }

  .development-process h3 {
    text-align: center;
    color: #667eea;
    margin-bottom: 2rem;
  }

  .process-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .process-step {
    text-align: center;
  }

  .step-number {
    width: 60px;
    height: 60px;
    background: #667eea;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 auto 1rem;
  }

  .process-step h4 {
    color: #667eea;
    margin-bottom: 0.5rem;
  }

  /* Future Section */
  .future-section {
    margin-bottom: 4rem;
  }

  .future-section h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    color: #667eea;
  }

  .future-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .context-card, .mvp-card {
    background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
    padding: 2rem;
    border-radius: 15px;
    border: 2px solid #667eea;
  }

  .context-card h3, .mvp-card h3 {
    color: #667eea;
    margin-bottom: 1rem;
  }

  .roadmap {
    background: white;
    padding: 2.5rem;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  }

  .roadmap h3 {
    text-align: center;
    color: #667eea;
    margin-bottom: 2rem;
  }

  .roadmap-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .roadmap-item {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 10px;
    text-align: center;
    transition: all 0.3s ease;
  }

  .roadmap-item:hover {
    background: #667eea;
    color: white;
    transform: translateY(-5px);
  }

  .roadmap-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .roadmap-item h4 {
    margin-bottom: 0.5rem;
  }

  /* CTA Section */
  .cta-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 4rem 2rem;
    border-radius: 20px;
    text-align: center;
    color: white;
  }

  .cta-content h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .cta-content p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-block;
    padding: 1rem 2rem;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .btn-primary {
    background: white;
    color: #667eea;
  }

  .btn-primary:hover {
    background: #f8f9fa;
    transform: translateY(-2px);
  }

  .btn-secondary {
    background: rgba(255,255,255,0.2);
    color: white;
    border: 2px solid white;
  }

  .btn-secondary:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-2px);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .about-container {
      padding: 1rem;
    }

    .hero-section {
      grid-template-columns: 1fr;
      text-align: center;
      padding: 2rem;
    }

    .hero-content {
      padding: 0;
    }

    .hero-content h1 {
      font-size: 2.5rem;
    }

    .hero-subtitle {
      font-size: 1.1rem;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .mission-grid, .features-grid, .values-grid {
      grid-template-columns: 1fr;
    }

    .process-steps {
      grid-template-columns: repeat(2, 1fr);
    }

    .roadmap-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .cta-buttons {
      flex-direction: column;
      align-items: center;
    }

    .btn {
      width: 100%;
      max-width: 300px;
    }
  }

  @media (max-width: 480px) {
    .hero-content h1 {
      font-size: 2rem;
    }

    .stats-grid, .process-steps, .roadmap-grid {
      grid-template-columns: 1fr;
    }

    .hero-badges {
      justify-content: center;
    }

    .team-skills {
      flex-direction: column;
      align-items: center;
    }
  }

  /* Animation globale */
  .about-container {
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

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
</style>