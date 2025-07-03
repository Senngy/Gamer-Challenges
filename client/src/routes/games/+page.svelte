<script>
    import BtnGame from '$lib/components/ui/BtnGame.svelte';
</script>

<div class="card-game">
    <h1>Bienvenue sur Gamer Challenge</h1>
    <p>Testez vos compétences avec nos jeux de programmation !</p>
    
    <div class="game-list">
        <div class="game-item">
        <h2>Jeu 1</h2>
        <p>Description du jeu 1.</p>
        <BtnGame />
        </div>
        
        <div class="game-item">
        <h2>Jeu 2</h2>
        <p>Description du jeu 2.</p>
        <BtnGame />
        </div>
        
        <!-- Ajoutez d'autres jeux ici -->
    </div>
</div>