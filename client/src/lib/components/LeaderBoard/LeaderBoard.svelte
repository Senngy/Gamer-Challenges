<script>
	//LeaderBoard.svelte
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const { leadersByChallenge, leadersByParticipation } = $props();
	let mode = $state('challenge'); // ← 'challenge' ou 'participation'
	function switchMode(m) {
		mode = m;
	}
</script>

<!-- ========================== -->
<!-- Leaderboard -->
<!-- ========================== -->
<aside class="leaderboard" aria-labelledby="leaderboard-title">
	<h2 class="leaderboard__title" id="leaderboard-title">Top tiers de Gamer Challenge par : </h2>
	<div class="tabs">
		<div class="btn-container">
			<div class="btn-background">
				<button class:active={mode === 'challenge'} on:click={() => switchMode('challenge')}>
					Challenges
				</button>
			</div>

			<div class="btn-background">
				<button
					class:active={mode === 'participation'}
					on:click={() => switchMode('participation')}
				>
					Participations
				</button>
			</div>
		</div>
	</div>
	<div>
		
		<span class="leaderboard__highlight" aria-hidden="true">🏆 #LeVoteDeLaCommu</span>
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
						src={user.avatar || 'https://via.placeholder.com/100'}
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
						src={user.avatar || 'https://via.placeholder.com/100'}
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
		margin: 0.5rem auto;
		justify-content: center;
	}
	.tabs button {
		padding: 0.3rem 0.6rem;
		cursor: pointer;
		border-radius: var(--general-border-radius);
		background: #00000000;
		color: rgb(224, 214, 214);
		font-family: 'Orbitron', sans-serif;
		
	}
	.btn-container {
		background: rgba(0, 0, 0, 0.185);
		padding: 0.4rem;
		border-radius: 25px;
		display: flex;
		gap: 0.5rem;
		box-shadow: 2px 2px 5px rgba(255, 79, 79, 0.548);
	}
	.btn-background {
		
		border-radius: 25px;
		
	}
	.btn-background button.active {
		background: linear-gradient(45deg, #ff8d8d9f, #4110107e);
		
	}
	.tabs button.active {
		border-bottom: 2px solid #333;
		font-weight: bold;
		background: linear-gradient(45deg, #ff8d8d9f, #4110107e);
		color: rgba(243, 240, 240, 0.911);
		/*box-shadow: 2px 2px 5px rgba(255, 79, 79, 0.548);*/
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
