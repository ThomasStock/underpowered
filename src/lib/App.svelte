<script lang="ts">
	import Canvas from './Canvas.svelte';
	import Background from './Background.svelte';
	import DotGrid from './DotGrid.svelte';
	import FPS from './FPS.svelte';
	import Boat from './Boat.svelte';
	import Div from './Div.svelte';
	import Tug from './Tug.svelte';
</script>

<Canvas>
	<Div><Boat /><Tug /></Div>
	<Background color="#90caf9">
		<DotGrid every={50} color="hsla(0, 0%, 100%, 0.5)" />
	</Background>
	<FPS />
</Canvas>
