<script>
	import { fade, fly } from 'svelte/transition';

	export let color;
	export let departures;
</script>

<div class="departures">
	{#each departures as departure}
		<span class="departure" style="background-color: {color};" in:fly out:fade>
			{departure}
		</span>
	{/each}
</div>

<style>
	.departures {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.departure {
		color: #fff;
		width: 37px;
		height: 37px;
		margin-left: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		font-weight: 700;
		line-height: 1.5;
		border-radius: 50%;
	}
</style>
