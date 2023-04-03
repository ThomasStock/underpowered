<script lang="ts">
	import { onMount, setContext } from 'svelte';

	import {
		key,
		width,
		height,
		canvas as canvasStore,
		context as contextStore,
		pixelRatio,
		props,
		time,
		type RenderElement,
		type Context,
		scaledHeight,
		scaledWidth,
		scale
	} from 'lib/game';
	import calculateCanvas from './calculateCanvas';

	export let killLoopOnError = true;

	let listeners: RenderElement[] = [];
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let box: HTMLDivElement;
	let frame: number;

	function initializeLoop() {
		// setup entities
		listeners.forEach(async (entity) => {
			if (entity.setup) {
				let p = entity.setup($props);
				if (p && (p as Promise<unknown>).then) await p;
			}
			entity.ready = true;
		});

		// start game loop
		return createLoop((elapsed, dt) => {
			time.set(elapsed);
			render(dt);
		});
	}

	setContext<Context>(key, {
		add(fn) {
			this.remove(fn);
			listeners.push(fn);
		},
		remove(fn) {
			const idx = listeners.indexOf(fn);
			if (idx >= 0) listeners.splice(idx, 1);
		}
	});

	function render(dt: number) {
		context.save();
		const scale = $pixelRatio;
		context.scale(scale, scale);
		listeners.forEach((entity) => {
			try {
				if (entity.mounted && entity.ready) {
					entity.render($props, dt);
				}
			} catch (err) {
				console.error(err);
				if (killLoopOnError) {
					cancelAnimationFrame(frame);
					console.warn('Animation loop stopped due to an error');
				}
			}
		});
		context.restore();
	}

	function createLoop(fn: (elapsed: number, dt: number) => void) {
		let elapsed = 0;
		let lastTime = performance.now();
		(function loop() {
			frame = requestAnimationFrame(loop);
			const beginTime = performance.now();
			const dt = (beginTime - lastTime) / 1000;
			lastTime = beginTime;
			elapsed += dt;
			fn(elapsed, dt);
		})();
		return () => {
			cancelAnimationFrame(frame);
		};
	}

	onMount(() => {
		canvasStore.set(canvas);

		context = canvas.getContext('2d')!;
		contextStore.set(context);

		const resizeObserver = new ResizeObserver((entries) => {
			const entry = entries[0];
			const boxRect = entry.contentRect;

			const scaled = calculateCanvas({ map: { width: $width, height: $height }, boxRect });

			scaledHeight.set(scaled.height);
			scaledWidth.set(scaled.width);
			scale.set(scaled.scale);
		});
		resizeObserver.observe(box);

		const stopLoop = initializeLoop();

		return () => {
			resizeObserver.unobserve(box);
			stopLoop();
		};
	});
</script>

<div class="w-screen h-screen bg-yellow-300" bind:this={box}>
	<canvas
		class="m-auto absolute inset-0 bg-fuchsia-200"
		bind:this={canvas}
		width={$scaledWidth * $pixelRatio}
		height={$scaledHeight * $pixelRatio}
		style="width: {$scaledWidth}px; height: {$scaledHeight}px;"
	/>
</div>

<slot />
