<script lang="ts">
	import { onMount } from 'svelte';
	import calculateCanvas from './calculateCanvas';

	let canvas: HTMLCanvasElement;
	let box: HTMLDivElement;

	// The scale represents how much % bigger the <canvas> is in px compared to the map
	// (They have the same aspect ratio)
	let scale: number;

	onMount(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			const entry = entries[0];
			const boxRect = entry.contentRect;

			const map = { width: 400, height: 800 };

			const { width, height, scale: newScale } = calculateCanvas({ map, boxRect });
			canvas.width = width;
			canvas.height = height;
			scale = newScale;
		});
		resizeObserver.observe(box);

		return () => resizeObserver.unobserve(box);
	});
</script>

<div class="w-screen h-screen bg-yellow-300" bind:this={box}>
	<div>Scale: {scale}</div>
	<canvas class="m-auto absolute inset-0 bg-blue-600" bind:this={canvas} />
</div>
