<script lang="ts">
	import { renderable, scaledWidth, width } from './game.js';

	export let color = 'hsl(0, 0%, 100%)';
	export let align: CanvasTextAlign = 'center';
	export let baseline: CanvasTextBaseline = 'middle';

	export let text = '';
	export let x = 0;
	export let y = 0;

	export let fontSize = 16;
	export let fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica';

	renderable((props) => {
		const { context } = props;
		if (text) {
			context.fillStyle = color;
			context.font = `${fontSize}px ${fontFamily}`;
			context.textAlign = align;
			context.textBaseline = baseline;
			context.fillText(text, $scaledWidth - x, y);
		}
	});
</script>

<!-- The following allows this component to nest children -->
<slot />
