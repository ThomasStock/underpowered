<script lang="ts">
	import App from 'lib/App.svelte';
	import { props } from 'lib/game';
</script>

{#if $props}
	<div class="fixed bottom-0 z-50 bg-white opacity-50">
		<div>Scale: {$props['scale']}</div>
		<div>Width: {$props['width']}</div>
		<div>scaledWidth: {$props['scaledWidth']}</div>
		<div>pixelRatio: {$props['pixelRatio']}</div>
		<div>time: {$props['time'].toFixed(1)}</div>
	</div>
{/if}
<App />
