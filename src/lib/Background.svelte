<script lang="ts">
	import { renderable } from './game.js';
	export let color: string | null = null;

	renderable((props) => {
		const { context, scaledWidth, scaledHeight } = props;
		context.clearRect(0, 0, scaledWidth, scaledHeight);
		if (color) {
			context.fillStyle = color;
			context.fillRect(0, 0, scaledWidth, scaledHeight);
		}
	});
</script>

<!-- The following allows this component to nest children -->
<slot />
