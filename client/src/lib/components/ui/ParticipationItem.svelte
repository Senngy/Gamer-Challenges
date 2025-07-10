<script>
    export let participation;
</script>

<div class="participation__item" role="listitem">
    
    <div class="participation__image" role="img">
    <iframe width="100%" height="auto" src="{participation.media_link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        
    </div>
    <div class="participation__content">
        <p class="participation__description">{participation.description}</p>

        <div class="challenge_created-by">
            <div class="challenge__user-avatar" aria-hidden="true">{participation.user.avatar}</div>
            <h3 class="participation__user">{participation.user.pseudo}</h3>
            
        </div>

        <div class="participation__like-count" aria-label="Nombre de likes">Like | Nombre de like</div>
    </div>
</div>

<style>
</style>