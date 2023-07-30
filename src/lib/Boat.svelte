<script lang="ts">
	import { scaledHeight, scaledWidth } from 'game';
	import Boat from './assets/boat.svg?dataurl';

	let height: number;
	let top: number;
	let left: number;
	let naturalWidth: number;
	let naturalHeight: number;

	$: if (naturalHeight && naturalWidth) {
		// I want the boat to be half the canvas height
		height = $scaledHeight / 2;

		// Place the boat in the vertical middle
		top = $scaledHeight / 2 - height / 2;

		// Place the boat in the horizontal middle
		const boatScale = height / naturalHeight;
		const width = boatScale * naturalWidth;
		left = $scaledWidth / 2 - width / 2;
	}
</script>

<img
	src={Boat}
	class="relative"
	alt="boat"
	bind:naturalWidth
	bind:naturalHeight
	style:top="{top}px"
	style:left="{left}px"
	style:height="{height}px"
/>
<slot />
