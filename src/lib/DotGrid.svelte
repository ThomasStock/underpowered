<script lang="ts">
	import { renderable } from './game.js';

	export let color: CanvasRenderingContext2D['fillStyle'];
	export let every: number;

	let pointSize = 2;

	renderable((props) => {
		const { context, scaledWidth, scaledHeight, scale } = props;

		const scaledEvery = every * scale;

		let x = scaledEvery;
		let y = scaledEvery;

		context.save();
		for (let y = scaledEvery; y < scaledHeight; y += scaledEvery) {
			context.beginPath();
			for (let x = scaledEvery; x < scaledWidth; x += scaledEvery) {
				context.arc(x, y, pointSize, 0, Math.PI * 2);
			}
			context.fillStyle = color;
			context.fill();
		}
		context.restore();
	});
</script>

<!-- The following allows this component to nest children -->
<slot />
