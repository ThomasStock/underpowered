<script lang="ts">
	import { scaledHeight, scaledWidth, scale } from 'game';
	import Tug from './assets/tug.svg?dataurl';

	let height: number;
	let top: number;
	let left: number;
	let naturalWidth: number;
	let naturalHeight: number;

	let mouseInfo = {hovered :false, down: false};
	$: ({ hovered, down } = mouseInfo)

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
	draggable="false"
	class={`cursor-grab absolute select-none 
	${hovered ? 'outline-4 outline-cyan-600 outline-offset-2 outline-dashed' : ''}`}
	alt="tug"
	bind:naturalWidth
	bind:naturalHeight
	on:mouseenter={() => (mouseInfo.hovered = true)}
	on:mouseleave={() => (mouseInfo.hovered = false)}
	on:mousedown={() => (mouseInfo.down = true)}
	on:mouseup={() => (mouseInfo.down = false)}
	style:top="{top}px"
	style:left="{left}px"
	style:height="{height}px"
/>
<slot />
