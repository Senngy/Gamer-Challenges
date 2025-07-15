<script>
  // LikeItem.svelte
  import { onMount } from 'svelte';
  import { getLikes, addLike, toggleLike } from '$lib/services/challenge.service.js';

  let { challenge, classCSS = '' } = $props();

  let likes = $state(0);
  let liked = $state(false)

  const handleAddLike = async () => {
    console.log('🔘 Bouton cliqué');
    console.log('challenge', challenge)
    console.log(challenge.id, 'ID du challenge');
    try {
      await addLike(challenge.id);
      likes += 1;
      console.log('✅ Like ajouté');
    } catch (err) {
      console.error('❌ Erreur lors du like :', err.message);
    }
  };
  
  const handleToggleLike = async () => {
    console.log('🔘 Bouton cliqué');
    console.log('challenge', challenge)
    console.log(challenge.id, 'ID du challenge');
    console.log('CLASSCSS', classCSS)
    try {
      const { likedNow } = await toggleLike(challenge.id); // Nous renvois true si l'utilisateur n'a pas encore liké et ajoute un like sinon supprime le like

      liked = likedNow;

      if (likedNow) {
        likes += 1;
      }
      if (!likedNow) {
        likes -= 1;
      }
      console.log('FRONT likedNow', likedNow)
      console.log('✅ Like ajouté');
    } catch (err) {
      console.error('❌ Erreur lors du like :', err.message);
    }
  };

   async function refreshLikes() {
    const res = await getLikes(challengeId);
    likes = res.likes;
    liked = res.liked;
  }

  $effect(() => {
    if (challenge.user_id) refreshLikes();
  });




  // Récupération initiale des likes une fois le composant monté
  onMount(() => {
    const fetchLikes = async () => {
      console.log('📥 Récupération des likes pour', challenge.id);
      try {
        const data = await getLikes(challenge.id);
        likes = data.likes;
        console.log('✔️ Likes initiaux:', likes);
      } catch (err) {
        console.error('❌ Erreur récupération des likes :', err);
      }
    };

    fetchLikes();
  });


</script>

<button type="button" class={`like-button ${classCSS}`} class:liked={liked} on:click={handleToggleLike}>
  <span class="like-count">{likes}</span>
</button>

<style>
  .like-button {
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid #ccc;
    padding: 8px 12px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 20px;
    transition: all 0.2s;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .like-button::before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 6px;
    background-image: url('/images/icons/heart-50-outlined.png');
    background-size: cover;
    background-repeat: no-repeat;
  }

  .like-button:hover {
    background: var(--btn-color);
  }

  .liked {
    color: var(--text-color-red);
    animation: pulse 0.2s ease-in-out;
  }

  .like-button.liked::before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 6px;
    background-image: url('/images/icons/heart-50-filled.png');
    background-size: cover;
    background-repeat: no-repeat;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  .like-count {
    margin-left: 6px;
  }

  .like-button:disabled {
    opacity: 0.6;
    cursor: wait;
  }
  .btn-from-challenge-page, .btn-from-challenge-item, .btn-from-participation {
		min-width: 100px;
		color:white;
  }
</style>