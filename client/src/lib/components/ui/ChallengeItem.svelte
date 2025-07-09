<script>
    export let challenge;
  
    // Exemple : accès au titre
    // challenge.title, challenge.description, etc.
  </script>
  
  <div class="challenge__item">
    <div class="challenge__image">
      <div class="challenge__participation-count">
        {challenge?.participations ?? 0} participations
      </div>
    </div>
    <div class="challenge__content">
      <h3 class="challenge__title">{challenge.title}</h3>
      <p class="challenge__description">{challenge.description}</p>
      <div class="challenge_created-by">
        <p>Challenge created by</p>
        <div class="challenge__user-avatar">{challenge.created_by}</div>
        <p class="challenge__user-name">{challenge.created_by}</p>
      </div>
      <div class="challenge__like-count">
        Likes : {challenge.challenge_likes}
      </div>
    </div>
  </div>
  