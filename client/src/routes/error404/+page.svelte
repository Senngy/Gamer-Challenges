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
        
        // Génération d'éclairs - BEAUCOUP plus d'éclairs
        const createLightning = () => {
            const lightning = {
                id: Math.random(),
                x1: Math.random() * window.innerWidth,
                y1: 0,
                x2: Math.random() * window.innerWidth,
                y2: window.innerHeight,
                opacity: 1,
                duration: 150 + Math.random() * 100,
                branches: Math.floor(Math.random() * 3) + 1
            };
            
            particles.push(lightning);
            particles = [...particles];
            
            setTimeout(() => {
                particles = particles.filter(p => p.id !== lightning.id);
            }, lightning.duration);
        };
        
        // Éclairs principaux - TRÈS fréquents
        const lightningInterval = setInterval(() => {
            if (Math.random() < 0.95) { // Presque tout le temps
                createLightning();
                // Créer plusieurs éclairs simultanés
                if (Math.random() < 0.8) {
                    setTimeout(() => createLightning(), 30);
                }
                if (Math.random() < 0.6) {
                    setTimeout(() => createLightning(), 60);
                }
                if (Math.random() < 0.4) {
                    setTimeout(() => createLightning(), 90);
                }
                if (Math.random() < 0.3) {
                    setTimeout(() => createLightning(), 120);
                }
            }
        }, 300 + Math.random() * 500); // Très fréquent : 300-800ms
        
        // Second générateur d'éclairs courts
        const microLightningInterval = setInterval(() => {
            if (Math.random() < 0.9) {
                const microLightning = {
                    id: Math.random(),
                    x1: Math.random() * window.innerWidth,
                    y1: Math.random() * window.innerHeight * 0.4,
                    x2: Math.random() * window.innerWidth,
                    y2: Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.4,
                    opacity: 0.7,
                    duration: 80 + Math.random() * 40,
                    branches: 1
                };
                
                particles.push(microLightning);
                particles = [...particles];
                
                setTimeout(() => {
                    particles = particles.filter(p => p.id !== microLightning.id);
                }, microLightning.duration);
            }
        }, 200 + Math.random() * 400); // Très fréquent : 200-600ms
        
        // Troisième générateur d'éclairs horizontaux
        const horizontalLightningInterval = setInterval(() => {
            if (Math.random() < 0.7) {
                const hLightning = {
                    id: Math.random(),
                    x1: 0,
                    y1: Math.random() * window.innerHeight,
                    x2: window.innerWidth,
                    y2: Math.random() * window.innerHeight,
                    opacity: 0.5,
                    duration: 100 + Math.random() * 50,
                    branches: 1
                };
                
                particles.push(hLightning);
                particles = [...particles];
                
                setTimeout(() => {
                    particles = particles.filter(p => p.id !== hLightning.id);
                }, hLightning.duration);
            }
        }, 600 + Math.random() * 800); // Moins fréquent : 600-1400ms
        
        // Suivi de la souris
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(lightningInterval);
            clearInterval(microLightningInterval);
            clearInterval(horizontalLightningInterval);
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
    
    <!-- Éclairs d'arrière-plan -->
    {#if mounted}
        <div class="lightning-container">
            {#each particles as lightning (lightning.id)}
                <svg class="lightning-bolt" style="opacity: {lightning.opacity};">
                    <defs>
                        <linearGradient id="lightningGradient-{lightning.id}" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
                            <stop offset="30%" style="stop-color:#c62828;stop-opacity:0.8" />
                            <stop offset="70%" style="stop-color:#8b1e1e;stop-opacity:0.6" />
                            <stop offset="100%" style="stop-color:#330000;stop-opacity:0.2" />
                        </linearGradient>
                    </defs>
                    <path 
                        d="M {lightning.x1} {lightning.y1} 
                           L {lightning.x1 + (Math.random() - 0.5) * 100} {lightning.y1 + window.innerHeight * 0.3}
                           L {lightning.x1 + (Math.random() - 0.5) * 150} {lightning.y1 + window.innerHeight * 0.6}
                           L {lightning.x2} {lightning.y2}"
                        stroke="url(#lightningGradient-{lightning.id})"
                        stroke-width="2"
                        fill="none"
                        class="lightning-path"
                    />
                    <!-- Branches secondaires -->
                    <path 
                        d="M {lightning.x1 + (Math.random() - 0.5) * 100} {lightning.y1 + window.innerHeight * 0.3}
                           L {lightning.x1 + (Math.random() - 0.5) * 200} {lightning.y1 + window.innerHeight * 0.5}"
                        stroke="url(#lightningGradient-{lightning.id})"
                        stroke-width="1"
                        fill="none"
                        class="lightning-branch"
                    />
                </svg>
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
                Oops ! Il semblerait que le haki perturbe cette page... 
                <br>
                🏴‍☠️ Shanks doit être non loin d'ici 🏴‍☠️
                <br>
                <br>
                Ou peut-être qu'elle n'a jamais existé dans cet univers !
            </p>
        </div>
        
        <!-- Suggestions -->
        <div class="suggestions">
            <h3>Que faire maintenant ?</h3>
            <ul>
                <li>🎮 Retourner à l' <button on:click={navigateHome} class="link-btn">accueil</button></li>
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
    /* Éclairs */
    .lightning-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    }

    .lightning-bolt {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        animation: lightning-flash 0.15s ease-in-out;
    }

    .lightning-path {
        filter: drop-shadow(0 0 15px #c62828) drop-shadow(0 0 30px #8b1e1e) drop-shadow(0 0 5px #ffffff);
        animation: lightning-flicker 0.1s ease-in-out;
    }

    .lightning-branch {
        filter: drop-shadow(0 0 8px #c62828) drop-shadow(0 0 15px #8b1e1e);
        opacity: 0.8;
    }

    @keyframes lightning-flash {
        0% { opacity: 0; }
        5% { opacity: 1; }
        15% { opacity: 0.2; }
        25% { opacity: 1; }
        35% { opacity: 0.4; }
        45% { opacity: 1; }
        100% { opacity: 0; }
    }

    @keyframes lightning-flicker {
        0%, 100% { opacity: 1; }
        30% { opacity: 0.8; }
        60% { opacity: 1; }
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