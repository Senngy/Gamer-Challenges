<script>
	import LikeItemParticipaton from '$lib/components/ui/likes/LikeItemParticipaton.svelte';
	import { onMount } from 'svelte';
	// import { get}
	import { getUserById } from '$lib/services/user.service.js';
    const API_URL = import.meta.env.VITE_API_URL;

	function getAvatarUrl(user) {
		if (!user?.avatar) return 'https://via.placeholder.com/100';
		return import.meta.env.MODE === 'production' ? user.avatar : `${API_URL}${user.avatar}`;
	}

	const { participation } = $props();
	console.log('Lien media :', participation.media_link);
	console.log('user avatar :', participation.user.avatar);
	console.log('user pseudo :', participation.user.pseudo);
	console.log('user id :', participation.user.id);

	let participationCreator = $state({
		pseudo: '',
		avatar: ''
	});

	onMount(async () => {
		// Utilisation de onMount pour récupérer les données du challenge lors du chargement du composant
		// Récupération des détails du challenge
		try {
			const { pseudo, avatar } = await getUserById(participation.user.id); // Récupération des informations de l'utilisateur connecté
			// console.log('onMount pseudo :', pseudo);
			// console.log('onMount avatar :', avatar);

			participationCreator = {
				// remplissage de l'objet challengeCreator avec les données de l'utilisateur
				pseudo: pseudo,
				avatar: avatar
			};
		} catch (err) {
			console.error('Erreur récupération challenge :', err);
		}
	});
</script>

<div class="participation__item" role="listitem">
	<div class="participation__image" role="img">
		{#if participation.media_link.startsWith('http')}
			<iframe
				width="100%"
				height="100%"
				src={participation.media_link}
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
		{:else}
			<p class="error">Lien média invalide : {participation.media_link}</p>
		{/if}
	</div>
	<div class="participation__content">
		<p class="participation__description">{participation.description}</p>

		<div class="participation__created-by">
			<div class="participation__user-avatar" aria-hidden="true">
				<img
					src={`${getAvatarUrl(participationCreator)}` || 'https://via.placeholder.com/100'}
					alt="Avatar"
					class="avatar-image"
				/>
			</div>
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
