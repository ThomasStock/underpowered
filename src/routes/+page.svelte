<script lang="ts">
	import Canvas, { type OnUpdate } from '../lib/components/Canvas/Canvas.svelte';

	let scale: number;
	const onUpdate: OnUpdate = (context, newScale) => {
		console.log('setitng scale');
		scale = newScale;
	};
</script>

{#if scale}
	<div class="fixed">Scale: {scale}</div>
{/if}
<Canvas {onUpdate} />
