<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let countdown = 10;

  onMount(() => {
    const interval = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(interval);
        goto('/');
      }
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<div class="exit-container">
  <div class="exit-content">
    <h1>😢 Nous sommes désolés de vous voir partir...</h1>
    
    <p class="goodbye-message">
      Merci d'avoir visité <strong>GamerChallenges</strong>. Nous espérons vous revoir bientôt pour de nouveaux défis gaming !
    </p>
    
    <div class="redirect-info">
      <p>Vous allez être redirigé vers la page d'accueil dans</p>
      <div class="countdown">
        {countdown}
      </div>
      <p>seconde{countdown > 1 ? 's' : ''}</p>
    </div>

    <button class="back-button" on:click={() => goto('/')}>
      Retourner à l'accueil maintenant
    </button>
  </div>
</div>

<style>
  .exit-container {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .exit-content {
    max-width: 600px;
    text-align: center;
    background: #222;
    padding: 3rem 2rem;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    color: #fff;
  }

  h1 {
    color: #4f8cff;
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }

  .goodbye-message {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 2.5rem;
    color: #e0e0e0;
  }

  .redirect-info {
    background: #333;
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    border: 2px solid #4f8cff;
  }

  .redirect-info p {
    margin: 0.5rem 0;
    font-size: 1.1rem;
    color: #fff;
  }

  .countdown {
    font-size: 3rem;
    font-weight: bold;
    color: #4f8cff;
    margin: 1rem 0;
    text-shadow: 0 0 10px rgba(79, 140, 255, 0.5);
    animation: pulse 1s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  .back-button {
    background: linear-gradient(135deg, #4f8cff, #3b82f6);
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
  }

  .back-button:hover {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 140, 255, 0.4);
  }

  @media (max-width: 768px) {
    .exit-content {
      padding: 2rem 1.5rem;
      margin: 1rem;
    }

    h1 {
      font-size: 1.8rem;
    }

    .goodbye-message {
      font-size: 1rem;
    }

    .countdown {
      font-size: 2.5rem;
    }

    .back-button {
      padding: 0.8rem 1.5rem;
      font-size: 1rem;
    }
  }
</style>