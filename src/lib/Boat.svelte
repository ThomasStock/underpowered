<script lang="ts">
	import { scaledHeight, scaledWidth } from 'game';
	import { afterUpdate } from 'svelte';

	let boatRect: DOMRectReadOnly;
	let height: number;
	let top: number;
	let left: number;

	$: if (boatRect) {
		height = $scaledHeight / 2;
		top = $scaledHeight / 2 - height / 2;
		left = $scaledWidth / 2 - boatRect.width / 2;
	}

	let ready = false;
	afterUpdate(() => {
		console.log('after update', {
			left,
			top,
			height,
			bw: boatRect?.width,
			scaledH: $scaledHeight,
			scaledw: $scaledWidth
		});
	});
</script>

<img
	src="boat.svg"
	class="relative"
	alt="boat"
	bind:contentRect={boatRect}
	style:top="{top}px"
	style:left="{left}px"
	style:height="{height}px"
	style:opacity={ready ? 1 : 0}
/>
<slot />
