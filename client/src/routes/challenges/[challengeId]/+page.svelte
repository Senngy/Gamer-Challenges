<script>
    import ParticipationItem from '$lib/components/ui/ParticipationItem.svelte';
    import Btn from '$lib/components/auth/Btn.svelte';
    import Input from "$lib/components/auth/Input.svelte";
    import Modal from '$lib/components/ui/Modal.svelte';
    import ParticipationForm from '$lib/components/participation/ParticipationForm.svelte';
    import { getChallenge } from "$lib/services/challenge.service.js";
    import { getParticipations } from "$lib/services/participation.service.js";
    import { participationCreation } from "$lib/services/participation.service.js";
    import { goto } from "$app/navigation";

    const { data } = $props();

	const { challengeId } = data;

    console.log(`PAGE Bonjour je suis le ${challengeId}`);

    const challenge_id = challengeId;

    let challenge = $state({
        title: "",
        description: "",
        rules: "",
        created_by: "",
        gamey_by: ""
    });

    let participations = $state([]);

    let user_id = 1;
    console.log(`user_id: ${user_id}`)

    let showModal = $state(false);

    let error =$state('');

    let media_link =$state('');
    let description =$state('');

    const getChallengeDetails = async () => {
        try {
            const challengeDetails = await getChallenge(challenge_id);
            console.log("Données du challenge récupérées :", challengeDetails);

            if (!challengeDetails) {
                throw new Error("Réponse inattendue : pas de détails disponibles");
            }

            const { title, description, rules, created_by, game_by } = challengeDetails;

            challenge = {
                title,
                description,
                rules,
                created_by,
                game_by
            };
        } catch (error) {
            console.error("Erreur lors de la récupération des informations du challenge :", error);
        }
    };

    const getParticipationsList = async () => {
        try {
            const participationsList = await getParticipations(challenge_id);
            console.log("Liste des participations du challenge récupérées :", participationsList);

            if (!participationsList) {
                throw new Error("Réponse inattendue : pas de participations disponibles");
            }

            participations = participationsList;

        } catch (error) {
            console.error("Erreur lors de la récupération des participations du challenge :", error);
        }
    };

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
            await getParticipations();
        } else {
            error = "Erreur : la création du challenge n'a pas été confirmée.";
        }
        } catch (e) {
            console.error('Erreur de création :', e);
            error = "Une erreur est survenue lors de la création.";
        }
    };

    function openModal() {
        showModal = true;
    }

    $effect(() => {
        getChallengeDetails();
        getParticipationsList();
    });

</script>

<!-- Challenge details -->

{#if challenge}
	<section class="challenge-details" aria-labelledby="challenge-details">
		<img src={`${challenge.image}`} alt={challenge.title} class="slide__image" />

		<div class="challenge-details__content">
			<h1 class="challenge-details__title">{challenge.title}</h1>
			<p class="challenge-details__description">{challenge.description}</p>
            <p class="challenge-details__rules">{challenge.rules}</p>

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
{:else}
	<p>Challenge introuvable.</p>
{/if}


<!-- Participations Section -->
<section class="catalog" aria-labelledby="catalog-title">

    <h2>Voici les meilleures participations de la communauté ! <span>{participations.length} participations en cours…</span></h2>

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
