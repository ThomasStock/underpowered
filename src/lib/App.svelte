<script lang="ts">
	import { width, height } from './game.js';

	import Canvas from './Canvas.svelte';
	import Background from './Background.svelte';
	import DotGrid from './DotGrid.svelte';
	import Text from './Text.svelte';
	import FPS from './FPS.svelte';
	import Boat from './Boat.svelte';
	import Div from './Div.svelte';
</script>

<Canvas>
	<Div><Boat /></Div>
	<Background color="#90caf9">
		<DotGrid every={50} color="hsla(0, 0%, 100%, 0.5)" />
	</Background>
	<!-- <Boat />
	<Text
		text="Click and drag around the page to move the character."
		fontSize={12}
		align="right"
		baseline="bottom"
		x={$width - 20}
		y={$height - 20}
	/> -->
	<FPS />
</Canvas>
