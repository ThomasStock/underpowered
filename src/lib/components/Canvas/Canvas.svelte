<script lang="ts" context="module">
	export type OnUpdate = (context: CanvasRenderingContext2D, scale: number) => void;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import calculateCanvas from './calculateCanvas';

	let canvas: HTMLCanvasElement;
	let box: HTMLDivElement;

	export let onUpdate: OnUpdate = () => undefined;

	onMount(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			const entry = entries[0];
			const boxRect = entry.contentRect;

			const map = { width: 1000, height: 1000 };

			const { width, height, scale } = calculateCanvas({ map, boxRect });
			canvas.width = width;
			canvas.height = height;

			const context = canvas.getContext('2d')!;

			onUpdate(context, scale);
		});
		resizeObserver.observe(box);

		return () => resizeObserver.unobserve(box);
	});
</script>

<div class="w-screen h-screen bg-yellow-300" bind:this={box}>
	<canvas class="m-auto absolute inset-0 bg-blue-600" bind:this={canvas} />
</div>
