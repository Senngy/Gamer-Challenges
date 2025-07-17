<script>
	import {
		getTopByChallengeLikes,
		getTopByParticipationLikes
	} from '$lib/services/user.service.js';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const API_URL = import.meta.env.VITE_API_URL;

	let leadersByChallenge = $state([]);
	let leadersByParticipation = $state([]);
	let mode = $state('challenge'); // ← 'challenge' ou 'participation'
	onMount(async () => {
		try {
			leadersByChallenge = await getTopByChallengeLikes();
			leadersByParticipation = await getTopByParticipationLikes();
			console.log('onMount leadersByChallenge', leadersByChallenge);
			console.log('onMount leadersByParticipation ', leadersByParticipation);
		} catch (err) {
			console.error('Erreur chargement des top users :', err);
		}
	});
	function switchMode(m) {
		mode = m;
	}
</script>

<!-- ========================== -->
<!-- Leaderboard -->
<!-- ========================== -->
<aside class="leaderboard" aria-labelledby="leaderboard-title">
	<div class="tabs">
		<button class:active={mode === 'challenge'} on:click={() => switchMode('challenge')}>
			Challenges
		</button>
		<button class:active={mode === 'participation'} on:click={() => switchMode('participation')}>
			Participations
		</button>
	</div>
	<div>
		<h2 class="leaderboard__title" id="leaderboard-title">Top challengers 🏆</h2>
		<span class="leaderboard__highlight" aria-hidden="true">#Gamerchallenges</span>
	</div>
	{#if mode === 'challenge'}
		{#each leadersByChallenge.slice(0, 3) as user, i (user.id)}
			<div
				class="leaderboard__item"
				role="listitem"
				aria-label={`Joueur ${i + 1} : ${user.pseudo}, ${user.totalChallengeLikes} likes, ${i + 1}e place`}
			>
				<div class="leaderboard__player-avatar avatar" aria-hidden="true">
					<img
						src={`${API_URL}${user.avatar}` || 'https://via.placeholder.com/100'}
						alt="Avatar"
						class="avatar-image"
					/>
				</div>
				<div class="leaderboard__player-info">
					<h3 class="leaderboard__player-name">{user.pseudo}</h3>
					<div class="leaderboard__player-stats">
						<span class="leaderboard__player-stat-heart" aria-hidden="true">❤️</span>
						<span class="leaderboard__player-stat-likes"> {user.totalChallengeLikes}</span>
					</div>
				</div>
				<div class="leaderboard__player-level" aria-label={`${i + 1}e place`}>
					{i === 0 ? '🏆' : i === 1 ? '🥈' : '🥉'}
					{i + 1}
				</div>
			</div>

			{#if i < 2}
				<span class="leaderboard__divider" role="separator" aria-hidden="true"></span>
			{/if}
		{/each}
	{:else}
		{#each leadersByParticipation.slice(0, 3) as user, i (user.id)}
			<div
				class="leaderboard__item"
				role="listitem"
				aria-label={`Joueur ${i + 1} : ${user.pseudo}, ${user.totalParticipationLikes} likes, ${i + 1}e place`}
			>
				<div class="leaderboard__player-avatar avatar" aria-hidden="true">
					<img
						src={`${API_URL}${user.avatar}` || 'https://via.placeholder.com/100'}
						alt="Avatar"
						class="avatar-image"
					/>
				</div>
				<div class="leaderboard__player-info">
					<h3 class="leaderboard__player-name">{user.pseudo}</h3>
					<div class="leaderboard__player-stats">
						<span class="leaderboard__player-stat-heart" aria-hidden="true">❤️</span>
						<span class="leaderboard__player-stat-likes"> {user.totalParticipationLikes}</span>
					</div>
				</div>
				<div class="leaderboard__player-level" aria-label={`${i + 1}e place`}>
					{i === 0 ? '🏆' : i === 1 ? '🥈' : '🥉'}
					{i + 1}
				</div>
			</div>

			{#if i < 2}
				<span class="leaderboard__divider" role="separator" aria-hidden="true"></span>
			{/if}
		{/each}
	{/if}
</aside>

<style>
	.tabs {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		justify-content: center;
	}
	.tabs button {
		padding: 0.3rem 0.6rem;
		cursor: pointer;
		border-radius: var(--general-border-radius);
		background: rgba(153, 60, 60, 0.1);
	}
	.tabs button.active {
		border-bottom: 2px solid #333;
		font-weight: bold;
	}
	.leaderboard__player-name {
		font-size: 1rem;
	}
	/*
	.leaderboard__player-avatar {
		width: 2.5rem;
		height: 2.5rem;
	}
		*/
	.avatar {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 0.5rem;
	}

	.avatar-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		border-radius: 50%;
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
	}
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.leaderboard__item {
		animation: fadeInUp 0.5s ease both;
	}
</style>
