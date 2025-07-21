<script>
	/// IMPORT
	// Svelte natif
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation'; // Pour la navigation

	// Components
	import AuthContainer from '$lib/components/auth/AuthContainer.svelte';
	import ProfilePopUp from '$lib/components/me/PopUp/ProfilePopUp.svelte';
	import DeletePopUp from '$lib/components/me/PopUp/DeletePopUp.svelte';
	import ModifyPasswordPopUp from '$lib/components/me/PopUp/ModifyPasswordPopUp.svelte';
	import ModifyPseudoPopUp from '$lib/components/me/PopUp/ModifyPseudoPopUp.svelte'; // Si vous avez besoin de modifier le pseudo
	import Btn from '$lib/components/me/Btn.svelte';

	// Service
	import { logout, getCurrentUser } from '$lib/services/auth.service.js'; // Fonction de déconnexion
	import { authStore, clearAuth, setAuth, getAuth } from '$lib/store/authStore.svelte.js'; // Importation du store d'authentification
	import { uploadAvatar } from '$lib/services/user.service.js';

	/// JS
  const API_URL = import.meta.env.VITE_API_URL

	// met à jour l’authentification de l’utilisateur en temps réel.
	$effect(() => {
		
		getAuth();
		getUserInfos();
	});

	let user = $state({
		id: '',
		username: '',
        avatar:'',
		first_name: '',
		last_name: '',
		email: '',
		birth_date: ''
	});

	let challenges = $state([
		{ title: ' ', status: ' ' },
		{ title: ' ', status: ' ' },
		{ title: ' ', status: ' ' }
	]);

	const getUserInfos = async () => {
		// Fonction pour récupérer les informations de l'utilisateur
		// Vérifie si l'utilisateur est authentifié
		console.log('getUserInfos');
		if (!authStore.token) {
			console.warn('Utilisateur non connecté. Redirection...');
			goto('/'); // ou une autre page publique
			return;
		}
        console.log('getUserInfos2');
		try {
			const userInfos = await getCurrentUser(); // Appelle ton service
			console.log('Données utilisateur récupérées :', userInfos);
			if (!userInfos) {
				throw new Error('Réponse inattendue : pas de userInfos');
			}
			console.log('User Infos:', userInfos);
			const { id, pseudo, email, avatar, challenge_created } = userInfos;
			user = { id, pseudo, email, avatar };
            console.log('user:', user);
			challenges = challenge_created?.length
				? challenge_created // existe donc associé a challenges
				: ['Aucun challenge créé']; // n'éxiste pas
		} catch (error) {
			console.error('Erreur lors de la récupération des informations utilisateur :', error);
		}
	};

	async function cleanLogout() {
		// Fonction de déconnexion
		// Logique de déconnexion ici
		try {
			await logout(); // Appel de la fonction de déconnexion
			clearAuth(); // Nettoyage du store d'authentification
			// Destruction du token d'authentification dans le back
			console.log('Déconnexion réussie');
			alert('Déconnexion !');
		} catch (error) {
			console.error('Erreur lors de la déconnexion :', error);
		}
		// Nettoyer le localStorage
		// Mettre à jour le store d'authentification
	}

	let label = 'Photo de profil / Avatar';
	let imageUrl = ''; // L'URL actuelle de l'avatar
	let id = 'avatar-upload';

	let previewUrl = $state(imageUrl);
	let uploadStatus = $state(''); // Pour afficher les messages de feedback
	let isUploading = $state(false);

	async function handleFileChange(event) {
		// Fonction pour gérer le changement de fichier pour l'avatar

		if (isUploading) return;
		const file = event.target.files[0];
		// 1. Vérification de l'existence
		if (!file) {
			uploadStatus = ' Aucun fichier sélectionné.';
			return;
		}

		// 2. Vérification du type
		if (!file.type.startsWith('image/')) {
			uploadStatus = ' Format de fichier invalide (image requise).';
			return;
		}

		// 3. Vérification de la taille
		const maxSizeMB = 2;
		if (file.size > maxSizeMB * 1024 * 1024) {
			uploadStatus = ` Taille maximale dépassée (${maxSizeMB} Mo).`;
			return;
		}

		// 4. Aperçu (preview) local
		const reader = new FileReader();
		reader.onload = () => {
			previewUrl = reader.result;
		};
		reader.readAsDataURL(file);

		// 5. Upload vers le backend
		try {
			isUploading = true;
			uploadStatus = 'Téléchargement en cours...';
      console.log('FRONT handleUpload userId', user.id)
      console.log('FRONT handleUpload file', file)
			const result = await uploadAvatar(user.id, file); // Appel au backend
			console.log("Résultat de l'upload :", result);

			if (result.success) {
				uploadStatus = 'Avatar mis à jour avec succès !';

				// Recharge les infos utilisateur (pour rafraîchir l'avatar stocké côté backend)
				await getUserInfos();
			} else {
				uploadStatus = "Échec de la mise à jour de l'avatar.";
			}
		} catch (error) {
			console.error('Erreur upload avatar :', error);
			uploadStatus = "Une erreur est survenue lors de l'upload.";
		} finally {
			isUploading = false;
			event.target.value = null; // Reset input
		}
	}

	let activeModal = $state(null); // Pour gérer l'état des popups

	function open(modal) {
		// Ouvre la popup
		activeModal = modal;
		console.log('Which popup is active:', activeModal);
	}
	function close() {
		activeModal = null;
	} // Ferme la popup active

	function redirect(url) {
		// Redirige vers une autre page
		goto(url);
		window.location.href = url;
	}
	/*
	onMount(() => {
		getAuth();
		getUserInfos();
		 // Appel de la fonction pour récupérer les infos utilisateur au chargement du composant
		console.log('onMount User : ', user)
	});
	*/
</script>

<svelte:head>
	<title>Mon Profil - GamerChallenges</title>
	<meta
		name="description"
		content="Gérez votre profil GamerChallenges, modifiez vos informations personnelles et consultez vos défis gaming."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="main-container">
	<div class="hero-section">
		<h1>Mon Profil</h1>
		<p class="hero-subtitle">Gérez vos informations et consultez vos défis gaming</p>
	</div>

	<AuthContainer title="Mes informations personnelles">
		<div class="user-info">
			<div class="avatar">
				<label for="avatar">Avatar :</label>
				<div class="avatar-container">
					<img
						src={`${API_URL}${user.avatar}` || 'https://via.placeholder.com/100'}
						alt="Avatar"
						class="avatar-image"
					/>
				</div>
				<div class="container">
					{#if isUploading}
						<p class="uploading">Envoi en cours...</p>
					{:else if uploadStatus}
						<p class="upload-status">{uploadStatus}</p>
					{/if}

					<label class="upload-btn" for="avatar-upload">Changer d’avatar</label>
					<input id="avatar-upload" type="file" accept="image/*" on:change={handleFileChange} hidden/>
				</div>
			</div>

			<div class="container email">
				<label for="email">Email :</label>
				<div>{user.email}</div>
			</div>

			<div class="container pseudo">
				<label for="pseudo" class="pseudo">Pseudo :</label>
				<div>{user.pseudo}</div>
				<button class="modify" on:click={() => open('modifyPseudo')}>Modifier le pseudo</button>
			</div>

			<div class="container password">
				<label for="password">Mot de passe :</label>
				<div>••••••••</div>
				<button class="modify" style="cursor:pointer" on:click={() => open('modifyPassword')}
					>Modifier le mot de passe</button
				>
			</div>

			<div class="container delete-account">
				<label for="delete">Suppression de compte :</label>
				<Btn variant="delete" on:click={() => open('deletePassword')}>Supprimer mon compte</Btn>
			</div>
		</div>
		{#if activeModal}
			<!-- Wrapper qui gère l’ouverture/fermeture générale -->
			<ProfilePopUp bind:open={activeModal} on:close={close}>
				<!-- Utilisation de la popup -->
				{#if activeModal === 'deletePassword'}
					<!-- Popup de suppression de compte -->
					<DeletePopUp on:close={close} />
				{:else if activeModal === 'modifyPassword'}
					<!-- Popup de modification de mot de passe -->
					<ModifyPasswordPopUp
						on:submit={(data) => {
							console.log('Nouveau mot de passe :', data.newPassword);
							close();
						}}
						on:close:{close}
					/>
				{:else if activeModal === 'modifyPseudo'}
					<!-- Popup de modification de pseudo -->
					<ModifyPseudoPopUp
						on:submit={(data) => {
							console.log('Nouveau pseudo :', data.newPseudo);
							close();
						}}
						on:close={close}
					/>
				{/if}
			</ProfilePopUp>
		{/if}
	</AuthContainer>

	<AuthContainer title="Mes challenges">
		<!--Challenges de l'utilisateur-->

		{#if !user.id || challenges.length === 0}
			<!-- Si l'utilisateur n'a pas de challenges -->
			<p>Aucun challenge créé pour le moment.</p>
		{:else}
			<ul class="challenges-list">
				{#each challenges as challenge}
					<li>
						<span>{challenge.title}</span>
						<span class="status">{challenge.status}</span>
					</li>
				{/each}
			</ul>
		{/if}
	</AuthContainer>

	<!-- Bouton de déconnexion -->
	<Btn
		variant="logout"
		on:click={() => {
			cleanLogout();
			redirect('/');
		}}>Se déconnecter</Btn
	>
</div>

<style>
	.main-container {
		padding: 0 1em;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 2em;
		max-width: 600px;
	}

	.hero-section {
		text-align: center;
		margin-bottom: 3rem;
	}
	.hero-section h1 {
		font-size: 3rem;
		font-weight: 700;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 1rem;
	}
	.hero-subtitle {
		font-size: 1rem;
		margin: 0 auto;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.user-info {
		background: none;
		padding: 1.5rem;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	.container {
		display: flex;
		flex-direction: column;
	}

	.container label {
		margin-bottom: 0.5rem;
		font-weight: 600;
		font-size: 0.95rem;
	}

	.container div,
	.container input {
		width: 100%;
		padding: 10px 20px;
		border: none;
		border-radius: 25px;
		background: rgba(255, 255, 255, 0.2);
		color: white;
		font-size: 14px;
	}
	.container.delete-account {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		margin-top: 2rem;
		align-items: center;
	}
	.modify {
		background: none;
		color: #4f8cff;
		text-decoration: underline;
		border: none;
	}
	.challenges {
		margin-top: 2rem;
	}

	.avatar {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 0.5rem;
	}

	.avatar-image {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		object-fit: cover;
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
	}
	.upload-status {
		color: #4ade80; /* vert */
		font-size: 0.9rem;
	}
	.uploading {
		color: #facc15; /* jaune */
		font-size: 0.9rem;
	}
	.upload-btn {
		display: inline-block;
		background: #4f46e5;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		cursor: pointer;
		font-weight: 600;
		transition: background 0.2s ease;
	}
	.upload-btn:hover {
		background: #4338ca;
	}
</style>
