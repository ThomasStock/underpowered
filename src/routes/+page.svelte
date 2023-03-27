<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let box: HTMLDivElement;

	// The canvasScale represents how much % bigger the <canvas> is in px compared to the map
	// (They have the same aspect ratio)
	let canvasScale: number;

	onMount(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			const entry = entries[0];
			const boxRect = entry.contentRect;

			const map = { width: 400, height: 800 };
			const mapAspectRatio = map.width / map.height;

			// Aspect ratio of the viewport (box fills viewport via css)
			const boxAspectRatio = boxRect.width / boxRect.height;

			// Resize the canvas so that it has the same aspect ratio as our map.
			// Canvas is centered with css so there is some 'leftover' either left/right or bottom.top
			//  while we make it as big as possible.
			if (mapAspectRatio > boxAspectRatio) {
				canvas.width = boxRect.width;
				canvas.height = boxRect.width / mapAspectRatio;
			} else {
				canvas.height = boxRect.height;
				canvas.width = boxRect.height * mapAspectRatio;
			}

			// Now we know the <canvas> is for example 2000*1000 and our map could be 100*50 so scale is '20'.
			// Which means when we draw a dot on the center of the map at (50,25),
			//  we should actually draw it at x20 these coordinates so at (1000,500) to draw in the center of the <canvas>
			canvasScale = canvas.width / map.width;
		});
		resizeObserver.observe(box);

		return () => resizeObserver.unobserve(box);
	});
</script>

<div class="w-screen h-screen bg-yellow-300" bind:this={box}>
	<div>Scale: {canvasScale}</div>
	<canvas class="m-auto absolute inset-0 bg-blue-600" bind:this={canvas} />
</div>
