<script>
    import ParticipationItem from '$lib/components/ui/ParticipationItem.svelte';
    import Btn from '$lib/components/auth/Btn.svelte';
    import Input from "$lib/components/auth/Input.svelte";
    import Modal from '$lib/components/ui/Modal.svelte';
    import ParticipationForm from '$lib/components/participation/ParticipationForm.svelte';
    import FilterText from '$lib/components/ui/FilterText.svelte';
    import { getChallenge } from "$lib/services/challenge.service.js";
    import { getParticipations } from "$lib/services/participation.service.js";
    import { participationCreation } from "$lib/services/participation.service.js";
    import { goto } from "$app/navigation";
	import { get } from 'svelte/store';
    import { onMount } from 'svelte';

    const { data } = $props(); // Récupération des données passées par le routeur SvelteKit
	const { challengeId } = data; // Récupération de l'ID du challenge depuis les données
    console.log(`PAGE Bonjour je suis le ${challengeId}`);

    const challenge_id = challengeId;

    let challenge = $state({
        title: "",
        description: "",
        rules: "",
        created_by: "",
        gamey_by: ""
    });

    let challengeCreator = $state({
        pseudo: "",
        avatar: ""
    });

    let participations = $state([]); // Initialisation de la liste des participations
    let showModal = $state(false); // État pour contrôler l'affichage du modal
    let error =$state(''); // État pour les messages d'erreur
    let success =$state(''); // État pour les messages de succès
    let media_link =$state(''); // État pour le lien du média
    let description =$state(''); // État pour la description de la participation
    let user_id = 3; // Remplacez par l'ID de l'utilisateur connecté
    // console.log(`user_id: ${user_id}`)

    onMount(async () => { // Utilisation de onMount pour récupérer les données du challenge lors du chargement du composant
        // Récupération des détails du challenge
       try {
           const challengeDetails = await getChallenge(challenge_id); // Appel à la fonction pour récupérer les détails du challenge
           if (!challengeDetails) throw new Error("Pas de challenge trouvé"); 

           const { title, description, rules, created_by, game_by } = challengeDetails; // Récupération des détails du challenge 
           const image = await getGameImage(game_by); // Appel à la fonction pour récupérer l'image du jeu associé au challenge
           const { pseudo, avatar } = await getUserInfo(created_by); // Récupération des informations de l'utilisateur connecté
           console.log("onMount pseudo :", pseudo);
           console.log("onMount avatar :", avatar);
            challenge = { // remplissage de l'objet challenge avec les données récupérées
                title,
                description,
                rules,
                created_by,
                game_by,
                image // ✅ Injecte ici l’image récupérée
           };
              challengeCreator = { // remplissage de l'objet challengeCreator avec les données de l'utilisateur
                 pseudo,
                 avatar
                };
                await getParticipationsList(); // Récupération des participations du challenge
    } catch (err) {
      console.error("Erreur récupération challenge :", err);
    }
  });

    async function getGameImage(gameId) { // Fonction pour récupérer l'image du jeu associé au challenge
       try {
           const res = await fetch(`http://localhost:3000/games/${gameId}`);
           const game = await res.json();
           return game.image;
        } catch (err) {
            console.error("Erreur getGameImage :", err);
           return null;
        }
    }

    async function getUserInfo(userId) { 
        try {
            const res = await fetch(`http://localhost:3000/users/${userId}`);
            if (!res.ok) {
                throw new Error(`Erreur HTTP ${res.status}`);
            }
             const user = await res.json();
             console.log("User info récupéré :", user);
            return {
                pseudo: user.pseudo,   // ou user.username, selon ta structure
                avatar: user.avatar    // ou user.image, selon ta structure
            };
        } catch (err) {
            console.error("Erreur getUserInfo :", err);
            return null;
       }
    }
   

    const getChallengeDetails = async () => { // Fonction pour récupérer les détails du challenge
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
           return getGameImage(challenge.game_by);
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
           const response = await participationCreation(media_link, description, user_id, challenge_id); // 

            console.log('Response from participationCreation:', response);
            // Si la création est réussie, réinitialiser les champs et fermer le modal
            media_link = '';
            description = '';
            error = '';
           if (response && response.success) {
               error = '';
              success = 'Participation créée avec succès !';
              setTimeout(() => {
				    success = '';
				    showModal = false; // Fermer la modale après succès
			    }, 3000); // Ferme la modale après 2 secondes
               await getParticipations(challenge_id); // Rafraîchir la liste des participations
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
			<p class="challenge-details__description">Objectif : {challenge.description}</p>
            <p class="challenge-details__rules">Règle : {challenge.rules}</p>

            <div class="challenge_created-by">
                <p>Challenge created by</p>
                <div class="challenge__user-avatar" aria-hidden="true">{challengeCreator.avatar}</div>
                <p class="challenge__user-name">{challengeCreator.pseudo}</p>
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
    {#if success}
        <p class="success">{success}</p>
    {/if}

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
  .success {
		color: #a3cca4;
		text-align: center;
		margin-bottom: 1rem;
	}
</style>
