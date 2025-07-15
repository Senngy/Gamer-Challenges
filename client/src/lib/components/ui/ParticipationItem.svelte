<script>
	import LikeItemParticipaton from "$lib/components/ui/LikeItemParticipaton.svelte";

    const { participation } = $props();
    console.log("Lien media :", participation.media_link)
    console.log("user avatar :", participation.user.avatar)
    console.log("user pseudo :", participation.user.pseudo)
   
</script>

<div class="participation__item" role="listitem">
    
    <div class="participation__image" role="img">
    {#if participation.media_link.startsWith('http')}
       <iframe width="100%" height="100%" src={participation.media_link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    {:else}
        <p class="error">Lien média invalide : {participation.media_link}</p>
    {/if}
    </div>
    <div class="participation__content">
        <p class="participation__description">{participation.description}</p>

        <div class="challenge_created-by">
            <div class="challenge__user-avatar" aria-hidden="true">{participation.user.avatar}</div>
            <h3 class="participation__user">{participation.user.pseudo}</h3>
            
        </div>
      <!---->
        {#if participation.id}
			{console.log('✅ participation est prêt', participation)}
			<LikeItemParticipaton classCSS="btn-from-participation" {participation} />
		{:else}
			<p>Chargement...</p>
		{/if}
        
    </div>
</div>

<style>
</style>