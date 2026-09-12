<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	onMount(async () => {
		const { createHero } = await import('$lib/scene/hero');
		return createHero(canvas);
	});
</script>

<canvas bind:this={canvas} class="absolute inset-0 h-full w-full"></canvas>
