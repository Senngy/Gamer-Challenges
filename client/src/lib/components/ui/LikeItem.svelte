<script>
  export let target;         // challenge ou participation
  export let targetType;     // 'challenge' ou 'participation'
  export let user_id;

  let isLiking = false;

  async function toggleLike() {
    isLiking = true;

    const method = target.user_liked ? 'DELETE' : 'POST';

    const response = await fetch(`http://localhost:3000/${targetType}s/${target.id}/likes`, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id })
    });

    const data = await response.json();

    if (response.ok) {
      target.user_liked = !target.user_liked;
      target.likes += target.user_liked ? 1 : -1;
    } else {
      console.error(data.message || 'Erreur serveur');
    }

    isLiking = false;
  }
</script>

<button
  class="like-button"
  data-liked={target.user_liked}
  on:click={toggleLike}
  disabled={isLiking}>
  {#if target.user_liked}
    ❤️ Liked : <span class="like-count">{target.likes}</span>
  {:else}
    🤍 Like : <span class="like-count">{target.likes}</span>
  {/if}
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

  .like-button[data-liked='true'] {
    color: red;
    border-color: red;
    font-weight: bold;
  }

  .like-count {
    margin-left: 6px;
  }

  .like-button:disabled {
    opacity: 0.6;
    cursor: wait;
  }
</style>