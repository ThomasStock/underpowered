<script lang="ts">
	let boat: HTMLImageElement;
	import Boat from './assets/boat.svg?component';
	const boatScale = 2;
</script>

<img src="boat.svg" alt="boat" bind:this={boat} height="600px" />
<!-- <Boat scale="200" /> -->
<!-- The following allows this component to nest children -->
<slot />
