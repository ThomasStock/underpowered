<script lang="ts">
	import App from 'lib/App.svelte';
	import { props } from 'lib/game';
	import { stringify } from 'postcss';

	const propKeys = Object.keys($props) as Array<keyof typeof $props>;
</script>

{#if $props}
	<div class="fixed z-50 bg-white opacity-50 w-48">
		{#each propKeys as propKey}
			<div>
				{propKey}: {typeof $props[propKey] === 'object' ? 'obj' : $props[propKey]}
			</div>
		{/each}
	</div>
{/if}
<App />
