<script>
	import { fade } from 'svelte/transition';
	import { notifications } from './notificationStore.js';
</script>

<div class="absolute top-0 right-0 m-10">
	{#each $notifications as alert}
		<div class="alert alert-{alert.type} alert-dismissible show" role="alert" in:fade out:fade>
			{alert.message}
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
	{/each}
</div>
