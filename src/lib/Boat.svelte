<script lang="ts">
	import { scaledHeight, scaledWidth } from 'game';

	let boat: HTMLImageElement;

	let boatRect: DOMRectReadOnly;
	let height = 0;
	let top = 0;
	let left = 0;

	$: {
		const screenWidth = $scaledWidth;
		const screenHeight = $scaledHeight;
		const boatClientWidth = boatRect?.width || 0;

		height = screenHeight / 2;
		top = screenHeight / 2 - height / 2;

		console.log({ screenHeight, screenWidth, boatClientWidth });

		if (boatClientWidth && screenWidth) {
			left = screenWidth / 2 - boatClientWidth / 2;
		}
	}
</script>

<img
	src="boat.svg"
	class="relative"
	alt="boat"
	bind:contentRect={boatRect}
	style:top="{top}px"
	style:left="{left}px"
	style:height="{height}px"
/>
<slot />
