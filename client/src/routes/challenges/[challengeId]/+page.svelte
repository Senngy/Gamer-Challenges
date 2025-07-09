<script>
    import ParticipationItem from '$lib/components/ui/ParticipationItem.svelte';

    import Btn from '$lib/components/auth/Btn.svelte';
    import Input from "$lib/components/auth/Input.svelte";

    import Modal from '$lib/components/ui/Modal.svelte';

    let showModal = $state(false);

    function openModal() {
      showModal = true;
    }

    import ParticipationForm from '$lib/components/participation/ParticipationForm.svelte';

    import { participationCreation } from "$lib/services/participation.service.js";
    import { fetchParticipations } from "$lib/services/participation.service.js";

    import { goto } from "$app/navigation";

    import { page } from '$app/stores';

    let media_link = $state(''); // Variable pour stocker l'url du média
    let description = $state(''); // Variable pour stocker la description

    let challenge_id = $state($page.params.challengeId); // Variable pour stocker l'ID du challenge
    console.log(`challenge_id: ${challenge_id}`)
    let user_id = 1;
    console.log(`user_id: ${user_id}`)

    let error =$state('');

    const handleSubmitParticipation = async (e) => {
        console.log('handleSubmitParticipation called');
        e.preventDefault();

        if (!media_link.trim() || !description.trim()) {
            error = "Veuillez remplir tous les champs.";
            return;
        }

        console.log('media_link:', media_link);
        console.log('description:', description);
        console.log('challenge_id:', challenge_id);
        console.log('user_id:', user_id);

        try {
        const response = await participationCreation(media_link, description, challenge_id, user_id);

        if (response && response.success) {
            error = '';
            alert('Participation créée avec succès !');
            showModal = false;
            await fetchParticipations();
        } else {
            error = "Erreur : la création du challenge n'a pas été confirmée.";
        }
        } catch (e) {
            console.error('Erreur de création :', e);
            error = "Une erreur est survenue lors de la création.";
        }
    };



    $effect(() => {
        if (challenge_id) {
            fetchParticipations(challenge_id).then((data) => {
                participations = data;
            });
        }

    });

    let participations = $state([]);
</script>

<!-- Challenge details -->
<section class="challenge-details" aria-labelledby="challenge-details">

    <img src="/images/logo-valorant.png" alt="Valorant" class="slide__image" />

    <div class="challenge-details__content">
        <h1 class="challenge-details__title">#challengeTitle</h1>
        <p class="challenge-details__description">#challengeDescription</p>
        <p class="challenge-details__rules">#challengeRules...</p>

        <div class="challenge_created-by">
            <p>Challenge created by</p>
            <div class="challenge__user-avatar" aria-hidden="true">B</div>
            <p class="challenge__user-name">#user</p>
        </div>

        <button class="btn btn--primary" onclick={openModal}>
            Participer au défi maintenant
        </button>
    </div>
</section>


<!-- Participations Section -->
<section class="catalog" aria-labelledby="catalog-title">

    <h2>Voici les meilleures participations de la communauté ! <span>256 participations en cours…</span></h2>

    <div class="catalog__grid" role="list">

    {#if participations.length > 0}
    {#each participations as participation}
        <ParticipationItem {participation} />
    {/each}
    {:else}
    <p>Aucune participation pour ce challenge pour le moment.</p>
    {/if}

    </div>

    <div class="load-more-container">
        <button class="btn secundary" id="load-more">
            Voir plus de participations
        </button>
    </div>
</section>

<!-- Participation Creation Form -->

<Modal isOpen={showModal} close={() => showModal = false}>

    <h2>Participer au challenge</h2>

    {#if error}
        <div class="error">{error}</div>
    {/if}
    
    <ParticipationForm onSubmit={handleSubmitParticipation}>
        <input type="hidden" value={challenge_id} name="challengeId" />
        <input type="hidden" value={user_id} name="userId" />
        <Input id="media_link" type="text" label="Lien du média" placeholder="Entrez un lien" bind:value={media_link} required />
        <Input id="description" type="text" label="Description" placeholder="Entrez une description" bind:value={description} required />
    
        <Btn>Valider</Btn>
    </ParticipationForm>
    <div class="already-account">
        <span>Pas encore de compte ? Créez en un simplement !</span>
        <a href="/auth/signup">Cliquez ici</a>
    </div>

</Modal>


<style>
  .error {
    color: #ff6b6b;
    text-align: center;
    margin-bottom: 1rem;
  }
  .already-account {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 1rem;
  }
  .already-account a {
    color: #4f8cff;
    text-decoration: underline;
    margin-left: 0.3rem;
    cursor: pointer;
    transition: color 0.2s;
  }
  .already-account a:hover {
    color: #2563eb;
  }
</style>
