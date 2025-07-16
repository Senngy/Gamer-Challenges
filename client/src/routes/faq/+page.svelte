<script>
  import { onMount } from 'svelte';
  
  let openSections = {};
  
  const faqData = [
    {
      category: "Général",
      questions: [
        {
          id: "what-is-gamerchallenges",
          question: "Qu'est-ce que GamerChallenges ?",
          answer: "GamerChallenges est une plateforme interactive dédiée aux gamers qui souhaitent relever des défis dans leurs jeux favoris. Vous pouvez participer à des challenges, créer vos propres défis et interagir avec une communauté passionnée de joueurs."
        },
        {
          id: "how-to-register",
          question: "Comment créer un compte ?",
          answer: "Pour créer un compte, cliquez sur le bouton 'S'inscrire' en haut de la page. Remplissez le formulaire avec vos informations (nom d'utilisateur, email, mot de passe) et confirmez votre inscription. Vous recevrez un email de confirmation."
        },
        {
          id: "free-platform",
          question: "L'utilisation de la plateforme est-elle gratuite ?",
          answer: "Oui, GamerChallenges est entièrement gratuit ! Vous pouvez créer un compte, participer aux défis et interagir avec la communauté sans aucun frais."
        }
      ]
    },
    {
      category: "Jeux et Défis",
      questions: [
        {
          id: "supported-games",
          question: "Quels jeux sont supportés ?",
          answer: "Nous supportons une large gamme de jeux populaires incluant Valorant, League of Legends, Minecraft, Cyberpunk 2077, Elden Ring, Fortnite, Apex Legends, The Witcher 3, et bien d'autres. La liste des jeux est régulièrement mise à jour."
        },
        {
          id: "create-challenge",
          question: "Comment créer un défi ?",
          answer: "Une fois connecté, rendez-vous dans la section 'Défis' et cliquez sur 'Créer un défi'. Choisissez le jeu, définissez les règles, la difficulté, la durée et les critères de réussite. Votre défi sera ensuite disponible pour la communauté."
        },
        {
          id: "join-challenge",
          question: "Comment participer à un défi ?",
          answer: "Parcourez les défis disponibles, cliquez sur celui qui vous intéresse et appuyez sur 'Participer'. Lisez attentivement les règles et les critères avant de commencer. Vous pourrez suivre votre progression dans votre profil."
        }
      ]
    },
    {
      category: "Participations et Progression",
      questions: [
        {
          id: "track-progress",
          question: "Comment suivre ma progression ?",
          answer: "Votre progression est visible dans votre profil personnel. Vous y trouverez vos défis en cours, terminés, vos statistiques, vos réussites et votre classement général."
        },
        {
          id: "submit-proof",
          question: "Comment prouver que j'ai réussi un défi ?",
          answer: "Selon le type de défi, vous devrez fournir des captures d'écran, des vidéos, ou des scores. Les preuves sont vérifiées par la communauté ou automatiquement selon les critères définis."
        }
      ]
    },
    {
      category: "Profil et Communauté",
      questions: [
        {
          id: "edit-profile",
          question: "Comment modifier mon profil ?",
          answer: "Accédez à votre profil en cliquant sur votre nom d'utilisateur, puis sur 'Modifier le profil'. Vous pouvez changer votre avatar, votre bio, vos jeux favoris et vos informations de contact."
        },
        {
          id: "like-system",
          question: "Comment fonctionne le système de likes ?",
          answer: "Vous pouvez liker les défis que vous appréciez pour les mettre en avant. Les défis les plus likés apparaissent en priorité dans les recommandations et le classement."
        }
      ]
    },
    {
      category: "Technique",
      questions: [
        {
          id: "system-requirements",
          question: "Quels sont les prérequis techniques ?",
          answer: "GamerChallenges fonctionne sur tous les navigateurs modernes (Chrome, Firefox, Safari, Edge). Aucun téléchargement n'est nécessaire, tout se passe dans votre navigateur web."
        },
        {
          id: "mobile-compatibility",
          question: "L'application est-elle compatible mobile ?",
          answer: "GamerChallenges est optimisée pour les appareils mobiles. Vous pouvez accéder à toutes les fonctionnalités depuis votre smartphone ou tablette via votre navigateur."
        }
      ]
    },
    {
      category: "Assistance",
      questions: [
        {
          id: "contact-support",
          question: "Comment contacter le support ?",
          answer: "Vous pouvez nous contacter via notre formulaire de contact, par email à support@gamerchallenges.com, ou via nos réseaux sociaux (Discord, Twitter, LinkedIn)."
        },
        {
          id: "forgot-password",
          question: "J'ai oublié mon mot de passe, que faire ?",
          answer: "Cliquez sur 'Mot de passe oublié' sur la page de connexion. Entrez votre email et suivez les instructions pour réinitialiser votre mot de passe."
        }
      ]
    }
  ];
  
  function toggleSection(categoryIndex, questionIndex) {
    const key = `${categoryIndex}-${questionIndex}`;
    openSections[key] = !openSections[key];
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
    
    document.querySelectorAll('.faq-item').forEach(item => {
      observer.observe(item);
    });
  });
</script>

<svelte:head>
  <title>FAQ - GamerChallenges</title>
  <meta name="description" content="Foire aux questions de GamerChallenges. Trouvez toutes les réponses à vos questions sur notre plateforme de défis gaming." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
</svelte:head>

<main class="faq-container">
  <div class="hero-section">
    <h1>Foire aux Questions</h1>
    <p class="hero-subtitle">
      Trouvez rapidement les réponses à vos questions sur GamerChallenges
    </p>
  </div>

  <div class="search-section">
    <div class="search-box">
      <input 
        type="text" 
        placeholder="Rechercher une question..." 
        class="search-input"
        on:input={(e) => {
          const searchTerm = e.target.value.toLowerCase();
          document.querySelectorAll('.faq-item').forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? 'block' : 'none';
          });
        }}
      />
      <span class="search-icon">🔍</span>
    </div>
  </div>

  <div class="faq-content">
    {#each faqData as category, categoryIndex}
      <section class="faq-category">
        <h2 class="category-title">{category.category}</h2>
        
        {#each category.questions as question, questionIndex}
          <div class="faq-item">
            <button 
              class="question-button"
              class:active={openSections[`${categoryIndex}-${questionIndex}`]}
              on:click={() => toggleSection(categoryIndex, questionIndex)}
            >
              <span class="question-text">{question.question}</span>
              <span class="toggle-icon">
                {openSections[`${categoryIndex}-${questionIndex}`] ? '−' : '+'}
              </span>
            </button>
            
            {#if openSections[`${categoryIndex}-${questionIndex}`]}
              <div class="answer-container">
                <p class="answer-text">{question.answer}</p>
              </div>
            {/if}
          </div>
        {/each}
      </section>
    {/each}
  </div>

  <div class="contact-section">
    <div class="contact-card">
      <h3>Vous ne trouvez pas votre réponse ?</h3>
      <p>Notre équipe de support est là pour vous aider !</p>
      <div class="contact-buttons">
        <a href="/contact" class="btn btn-primary">Nous contacter</a>
        <a href="mailto:support@gamerchallenges.com" class="btn btn-secondary">Email direct</a>
      </div>
    </div>
  </div>
</main>

<style>
  .faq-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  .hero-section {
    text-align: center;
    margin-bottom: 3rem;
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
  .search-section {
    margin-bottom: 3rem;
  }
  .search-box {
    position: relative;
    max-width: 500px;
    margin: 0 auto;
  }
  .search-input {
    width: 100%;
    padding: 1rem 3rem 1rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  .search-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  }
  .search-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    color: #999;
  }
  .faq-content {
    margin-bottom: 4rem;
  }
  .faq-category {
    margin-bottom: 3rem;
  }
  .category-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 3px solid #667eea;
    display: inline-block;
  }
  .faq-item {
    margin-bottom: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
  }
  .faq-item:global(.animate-fade-in) {
    opacity: 1;
    transform: translateY(0);
  }
  .faq-item:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border-color: #cbd5e0;
  }
  .question-button {
    width: 100%;
    background: white;
    border: none;
    padding: 1.5rem;
    text-align: left;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    color: #2d3748;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
  }
  .question-button:hover {
    background: #f7fafc;
  }
  .question-button.active {
    background: #edf2f7;
    color: #667eea;
  }
  .question-text {
    flex: 1;
    padding-right: 1rem;
  }
  .toggle-icon {
    font-size: 1.5rem;
    font-weight: bold;
    color: #667eea;
    transition: transform 0.3s ease;
  }
  .question-button.active .toggle-icon {
    transform: rotate(180deg);
  }
  .answer-container {
    padding: 0 1.5rem 1.5rem;
    background: #f8fafc;
    border-top: 1px solid #e2e8f0;
    animation: slideDown 0.3s ease-out;
  }
  @keyframes slideDown {
    from {
      opacity: 0;
      max-height: 0;
      padding-top: 0;
      padding-bottom: 0;
    }
    to {
      opacity: 1;
      max-height: 200px;
      padding-top: 0;
      padding-bottom: 1.5rem;
    }
  }
  .answer-text {
    color: #4a5568;
    line-height: 1.7;
    margin: 0;
    font-size: 0.95rem;
  }
  .contact-section {
    margin-top: 4rem;
    padding-top: 3rem;
    border-top: 2px solid #e2e8f0;
  }
  .contact-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2.5rem;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
  .contact-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  .contact-card p {
    font-size: 1rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
  .contact-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    display: inline-block;
  }
  .btn-primary {
    background: white;
    color: #667eea;
  }
  .btn-primary:hover {
    background: #f7fafc;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
  .btn-secondary {
    background: transparent;
    color: white;
    border-color: white;
  }
  .btn-secondary:hover {
    background: white;
    color: #667eea;
    transform: translateY(-2px);
  }
  @media (max-width: 480px) {
    .hero-section h1 {
      font-size: 1.5rem;
    }
    .category-title {
      font-size: 1.2rem;
    }
    .question-button {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
    .toggle-icon {
      align-self: flex-end;
    }
  }
</style>