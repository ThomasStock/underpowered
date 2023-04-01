<script lang="ts">
	import Canvas from '../lib/components/Canvas/Canvas.svelte';
	import { scale } from '../lib/stores/canvas';
</script>

{#if $scale}
	<div class="fixed">Scale: {$scale}</div>
{/if}
<Canvas />
