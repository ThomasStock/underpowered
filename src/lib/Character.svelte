<script lang="ts">
	import { renderable, scaledHeight, scaledWidth } from './game.js';
	import Text from './Text.svelte';
	import vec2 from 'gl-vec2';

	export let color = '#ffe554';
	export let size = 10;
	export let thickness = 3;

	let x = 0;
	let y = 0;
	$: {
		x = $scaledWidth / 2;
		y = $scaledHeight / 2;
	}

	export let maxVelocity = 5;

	let text: Text;

	const velocity = [0, 0];

	console.log({ x, y });

	renderable((props, dt) => {
		const { context, scaledHeight, scaledWidth } = props;

		console.log('scaled', scaledHeight, scaledWidth);

		let position = [x, y];

		if (x < 0 || x > scaledWidth) {
			x = Math.max(0, Math.min(scaledWidth, x));
			velocity[0] *= -1;
		}
		if (y < 0 || y > scaledHeight) {
			y = Math.max(0, Math.min(scaledHeight, y));
			velocity[1] *= -1;
		}
		velocity[0] = Math.max(-maxVelocity, Math.min(maxVelocity, velocity[0]));
		velocity[1] = Math.max(-maxVelocity, Math.min(maxVelocity, velocity[1]));
		velocity[0] *= 0.98;
		velocity[1] *= 0.98;
		x += velocity[0];
		y += velocity[1];

		position[0] = x;
		position[1] = y;

		context.lineCap = 'round';

		context.beginPath();
		context.fillStyle = color;
		context.strokeStyle = color;
		context.lineWidth = thickness;
		context.arc(x, y, size, 0, Math.PI * 2);
		context.stroke();

		if (vec2.squaredLength(velocity) > 0) {
			const normal = vec2.normalize([], velocity);
			context.lineWidth = thickness;

			const point = vec2.scaleAndAdd([], position, normal, length);
			context.beginPath();
			context.moveTo(position[0], position[1]);
			context.lineTo(point[0], point[1]);
			context.stroke();
		}

		// We use this to make sure the text is in sync with the character
		// Because regular prop reactivity happens a frame too late
		text.$set({
			text: `(${position.map((n) => Math.round(n)).join(', ')})`,
			x,
			y: y + size + 10
		});
	});
</script>

<Text fontSize={8} baseline="top" bind:this={text} />

<!-- The following allows this component to nest children -->
<slot />
