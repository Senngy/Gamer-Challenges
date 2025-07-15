<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    let mounted = false;
    let glitchActive = false;
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    
    onMount(() => {
        mounted = true;
        
        // Effet de glitch aléatoire
        setInterval(() => {
            glitchActive = true;
            setTimeout(() => {
                glitchActive = false;
            }, 200);
        }, 3000 + Math.random() * 2000);
        
        // Génération de particules
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
        
        // Animation des particules
        const animateParticles = () => {
            particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                if (particle.x < 0) particle.x = window.innerWidth;
                if (particle.x > window.innerWidth) particle.x = 0;
                if (particle.y < 0) particle.y = window.innerHeight;
                if (particle.y > window.innerHeight) particle.y = 0;
            });
            
            particles = [...particles];
            requestAnimationFrame(animateParticles);
        };
        
        animateParticles();
        
        // Suivi de la souris
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    });
    
    const navigateHome = () => {
        goto('/');
    };
    
    const navigateBack = () => {
        window.history.back();
    };
</script>

<svelte:head>
  <title>404 - Page Non Trouvée | GamerChallenges</title>
  <meta name="description" content="Oops ! Cette page n'existe pas dans notre univers gaming." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
</svelte:head>

<div class="error-container" class:glitch={glitchActive}>
    <!-- Particules d'arrière-plan -->
    {#if mounted}
        <div class="particles">
            {#each particles as particle}
                <div 
                    class="particle"
                    style="left: {particle.x}px; top: {particle.y}px; width: {particle.size}px; height: {particle.size}px; opacity: {particle.opacity};"
                ></div>
            {/each}
        </div>
    {/if}
    
    <!-- Effet de curseur -->
    <div 
        class="cursor-glow"
        style="left: {mouseX - 25}px; top: {mouseY - 25}px;"
    ></div>
    
    <!-- Contenu principal -->
    <div class="content">
        <!-- Titre 404 avec avatar dans le 0 -->
        <div class="error-code">
            <span class="digit">4</span>
            <div class="zero-container">
                <span class="digit zero">0</span>
                <div class="avatar-container">
                    <img src="/images/avatar.gif" alt="Avatar" class="avatar-gif" />
                </div>
            </div>
            <span class="digit">4</span>
        </div>
        
        <!-- Messages d'erreur -->
        <div class="error-messages">
            <h1 class="main-title">GAME OVER</h1>
            <h2 class="sub-title">Page Non Trouvée</h2>
            <p class="description">
                Oops ! Il semblerait que cette page ait été détruite par un boss final... 
                <br>
                Ou peut-être qu'elle n'a jamais existé dans cet univers !
            </p>
        </div>
        
        <!-- Suggestions -->
        <div class="suggestions">
            <h3>Que faire maintenant ?</h3>
            <ul>
                <li>🎮 Retourner à l'<button on:click={navigateHome} class="link-btn">accueil</button></li>
                <li>🔙 Revenir à la <button on:click={navigateBack} class="link-btn">page précédente</button></li>
                <li>🎯 Découvrir nos <a href="/challenges" class="link">défis gaming</a></li>
                <li>🎲 Explorer nos <a href="/games" class="link">jeux</a></li>
            </ul>
        </div>
        
        <!-- Boutons d'action -->
        <div class="action-buttons">
            <button on:click={navigateHome} class="btn primary">
                🏠 Retour à l'accueil
            </button>
            <button on:click={navigateBack} class="btn secondary">
                ← Page précédente
            </button>
        </div>
        
        <!-- Easter egg -->
        <div class="easter-egg">
            <p>Code d'erreur: <span class="code">PLAYER_NOT_FOUND_404</span></p>
        </div>
    </div>
</div>

<style>
  .error-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0e0f 0%, #1a1c1f 50%, #330000 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;
  color: var(--text-color, #eeeeee);
  font-family: 'Orbitron', sans-serif; /* Ajoutez cette ligne */
}    
/* Effet de glitch */
    .glitch {
        animation: glitch 0.3s ease-in-out;
        filter: hue-rotate(280deg) saturate(1.1) brightness(0.8) contrast(1.4);
    }
    @keyframes glitch {
      0%, 100% { transform: translate(0) skew(0deg); }
      10% { transform: translate(-8px, 5px) skew(-2deg); }
      20% { transform: translate(-5px, -8px) skew(1deg); }
      30% { transform: translate(6px, 3px) skew(-1deg); }
      40% { transform: translate(-4px, -6px) skew(2deg); }
      50% { transform: translate(7px, -2px) skew(-1.5deg); }
      60% { transform: translate(3px, 8px) skew(1deg); }
      70% { transform: translate(-6px, -4px) skew(-0.5deg); }
      80% { transform: translate(5px, -7px) skew(1.5deg); }
      90% { transform: translate(-3px, 4px) skew(-1deg); }
    }
    
    /* Particules */
    .particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    }
    
    .particle {
        position: absolute;
        background: linear-gradient(45deg, #c62828, #8b1e1e);
        border-radius: 50%;
        animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    /* Effet de curseur */
    .cursor-glow {
        position: fixed;
        width: 50px;
        height: 50px;
        background: radial-gradient(circle, rgba(198, 40, 40, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 2;
        transition: all 0.1s ease-out;
    }
    
    /* Contenu principal */
    .content {
        text-align: center;
        z-index: 3;
        position: relative;
        max-width: 800px;
    }
    
    /* Code d'erreur 404 */
    .error-code {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
    }
    
    .digit {
    font-family: 'Orbitron', monospace;
    font-size: clamp(4rem, 15vw, 12rem);
    font-weight: 900;
    background: linear-gradient(45deg, #c62828, #8b1e1e, #ff5722);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 30px rgba(198, 40, 40, 0.5);
    animation: pulse 2s ease-in-out infinite;
  }
    
    .zero-container {
        position: relative;
        display: inline-block;
    }
    
    .zero {
    position: relative;
    z-index: 1;
    }
    
    .avatar-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: clamp(2rem, 9vw, 7rem);
    height: clamp(2rem, 9vw, 7rem);
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #c62828;
    box-shadow: 0 0 20px rgba(198, 40, 40, 0.6);
}
    
    .avatar-gif {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1.25); }
        50% { opacity: 0.8; transform: scale(1.05); }
    }
    
    @keyframes spin {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    /* Messages d'erreur */
    .error-messages {
        margin-bottom: 3rem;
    }
    
    .main-title {
        font-size: clamp(2rem, 6vw, 4rem);
        font-weight: 800;
        margin: 0 0 1rem 0;
        background: linear-gradient(45deg, #ff5722, #c62828);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        text-transform: uppercase;
        letter-spacing: 3px;
    }
    
    .sub-title {
        font-size: clamp(1.2rem, 4vw, 2rem);
        margin: 0 0 1.5rem 0;
        color: #eeeeee;
        font-weight: 600;
    }
    
    .description {
        font-size: clamp(1rem, 2.5vw, 1.2rem);
        line-height: 1.6;
        color: rgba(238, 238, 238, 0.8);
        margin: 0 0 2rem 0;
    }
    
    /* Suggestions */
    .suggestions {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(198, 40, 40, 0.3);
        border-radius: 15px;
        padding: 2rem;
        margin-bottom: 3rem;
        backdrop-filter: blur(10px);
    }
    
    .suggestions h3 {
        margin: 0 0 1.5rem 0;
        color: #c62828;
        font-size: 1.3rem;
        font-weight: 600;
    }
    
    .suggestions ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .suggestions li {
        padding: 0.8rem 0;
        font-size: 1.1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .suggestions li:last-child {
        border-bottom: none;
    }
    
    .link-btn {
        background: none;
        border: none;
        color: #c62828;
        text-decoration: none;
        cursor: pointer;
        font-size: inherit;
        font-family: inherit;
        padding: 0;
        transition: color 0.3s ease;
    }

    .link-btn:hover {
        color: #ff5722;
    }
    
    .link {
        color: #c62828;
        text-decoration: none;
        transition: color 0.3s ease;
    }
    
    .link:hover {
        color: #ff5722;
        text-decoration: underline;
    }
    
    /* Boutons d'action */
    .action-buttons {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        margin-bottom: 3rem;
        flex-wrap: wrap;
    }
    
    .btn {
        padding: 1rem 2rem;
        border: none;
        border-radius: 10px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
        position: relative;
        overflow: hidden;
    }
    
    .btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
    }
    
    .btn:hover::before {
        left: 100%;
    }
    
    .btn.primary {
        background: linear-gradient(45deg, #c62828, #8b1e1e);
        color: white;
        box-shadow: 0 4px 15px rgba(198, 40, 40, 0.4);
    }
    
    .btn.primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(198, 40, 40, 0.6);
    }
    
    .btn.secondary {
        background: transparent;
        color: #eeeeee;
        border: 2px solid #c62828;
    }
    
    .btn.secondary:hover {
        background: #c62828;
        transform: translateY(-2px);
    }
    
    /* Easter egg */
    .easter-egg {
        opacity: 0.6;
        font-size: 0.9rem;
    }
    
    .code {
    font-family: 'Orbitron', monospace;
    color: #c62828;
    background: rgba(198, 40, 40, 0.1);
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
    font-weight: bold;
    }

  @media (max-width: 480px) {
    .avatar-container {
        width: clamp(2.5rem, 8vw, 6rem);
        height: clamp(2.5rem, 8vw, 6rem);
    }
    
    .suggestions li {
        font-size: 1rem;
    }
  }
</style>