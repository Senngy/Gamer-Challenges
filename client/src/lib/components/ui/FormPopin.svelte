<script>
	export let title = "";

    function closePopin() {
		showPopin = false;
	}
</script>

<div class="popin">
    <div class="form-container">
        <button class="close-button" on:click={closePopin}>×</button>
        <h2>{title}</h2>
        <slot></slot>
    </div>
</div>

<style>
	.popin {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 99;
		cursor: pointer;
	}
	.form-container {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
		border-radius: 20px;
		padding: 2rem;
		cursor: auto;
		position: relative;
		min-width: 300px;
		max-width: 90vw;
	}
	.close-button {
		position: absolute;
		top: 1rem;
		right: 1rem;
        width: 44px;
        height: 44px;
        border-radius: 50%;
		background: none;
		border: none;
		font-size: 1.5rem;
		color: white;
		cursor: pointer;
	}
    .close-button:hover {
        background: rgba(255, 255, 255, 0.1);
    }
	h2 {
		text-align: center;
		margin-bottom: 1.5rem;
		font-size: 2rem;
		color: white;
	}
</style>