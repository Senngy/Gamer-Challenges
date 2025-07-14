<script>
  import { onMount } from 'svelte';
  import { getLikes, addLike } from '$lib/services/challenge.service.js';

  let { challenge } = $props();
  let likes = $state(0);

  const handleAddLike = async () => {
    console.log('🔘 Bouton cliqué');
    console.log(challenge.id, 'ID du challenge');
    try {
      await addLike(challenge.id);
      likes += 1;
      console.log('✅ Like ajouté');
    } catch (err) {
      console.error('❌ Erreur lors du like :', err.message);
    }
  };

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

<button type="button" class="like-button" on:click={handleAddLike}>
  ❤️ <span class="like-count">{likes}</span>
</button>

<style>
  .like-button {
    background: none;
    border: 1px solid #ccc;
    padding: 8px 12px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s;
  }

  .like-count {
    margin-left: 6px;
  }

  .like-button:disabled {
    opacity: 0.6;
    cursor: wait;
  }
</style>