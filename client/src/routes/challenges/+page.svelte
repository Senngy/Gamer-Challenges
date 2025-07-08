<script>
    import Btn from '$lib/components/auth/Btn.svelte';
    import Input from "$lib/components/auth/Input.svelte";
    import AuthContainer from '$lib/components/auth/AuthContainer.svelte';
    import ChallengeForm from '$lib/components/challenge/ChallengeForm.svelte';

    import { challengeCreation } from "$lib/services/challengeCreation.service.js";
    import { goto } from "$app/navigation";

    let title = $state(''); // Variable pour stocker le titre
    let description = $state(''); // Variable pour stocker la description
    let rules = $state(''); // Variable pour stocker les règles

    let error =$state('');

    const handleSubmitChallenge = async (e) => {
        console.log('handleSubmitChallenge called');
        e.preventDefault();

        if (!title.trim() || !description.trim() || !rules.trim()) {
            error = "Veuillez remplir tous les champs.";
            return;
        }

        console.log('title:', title);
        console.log('description:', description);
        console.log('rules:', rules);

        try {
        const response = await challengeCreation(title, description, rules);

        if (response && response.success) {
            error = '';
            alert('Challenge créé avec succès !');
            goto('/challenges');
        } else {
            error = "Erreur : la création du challenge n'a pas été confirmée.";
        }
        } catch (e) {
            console.error('Erreur de création :', e);
            error = "Une erreur est survenue lors de la création.";
        }
    };

</script>


<AuthContainer title="Créer un challenge">

    {#if error}
        <div class="error">{error}</div>
    {/if}
    
    <ChallengeForm onSubmit={handleSubmitChallenge}>
        <Input id="title" type="text" label="Titre" placeholder="Entrez un titre" bind:value={title} required />
        <Input id="description" type="text" label="Description" placeholder="Entrez une description" bind:value={description} required />
        <Input id="rules" type="text" label="Règles" placeholder="Précisez les règles" bind:value={rules} required />
    
        <Btn>Valider</Btn>
    </ChallengeForm>
    <div class="already-account">
        <span>Pas encore de compte ? Créez en un simplement !</span>
        <a href="/auth/signup">Cliquez ici</a>
    </div>

</AuthContainer>


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