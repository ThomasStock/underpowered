<script lang="ts">
	import { onMount } from 'svelte';
	import calculateCanvas from './calculateCanvas';
	import { context, scale } from '../../stores/canvas';

	let canvas: HTMLCanvasElement;
	let box: HTMLDivElement;

	onMount(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			const entry = entries[0];
			const boxRect = entry.contentRect;

			const map = { width: 1000, height: 1000 };

			const { width, height, scale: canvasScale } = calculateCanvas({ map, boxRect });
			canvas.width = width;
			canvas.height = height;

			context.set(canvas.getContext('2d')!);
			scale.set(canvasScale);
		});
		resizeObserver.observe(box);

		return () => resizeObserver.unobserve(box);
	});
</script>

<div class="w-screen h-screen bg-yellow-300" bind:this={box}>
	<canvas class="m-auto absolute inset-0 bg-blue-600" bind:this={canvas} />
</div>
