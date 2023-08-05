<script lang="ts">
	import { scaledHeight, scaledWidth, scale } from 'game';
	import Tug from './assets/tug.svg?dataurl';

	let height: number;
	let top: number;
	let left: number;
	let naturalWidth: number;
	let naturalHeight: number;

	$: if (naturalHeight && naturalWidth) {
		height = 60 * $scale;

		const padding = 20 * $scale;

		// Place the boat bottom
		top = $scaledHeight - height - padding;

		const boatScale = height / naturalHeight;
		const width = boatScale * naturalWidth;
		left = $scaledWidth - width - padding;
	}
</script>

<img
	src={Tug}
	class="cursor-grab outline-4 select-none outline-cyan-600 absolute outline-offset-2 outline-dashed"
	alt="tug"
	bind:naturalWidth
	bind:naturalHeight
	style:top="{top}px"
	style:left="{left}px"
	style:height="{height}px"
/>
<slot />
