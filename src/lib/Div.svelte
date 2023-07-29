<script lang="ts">
	import { pixelRatio, scaledHeight, scaledWidth } from 'lib/game';
</script>

<div
	class="m-auto absolute inset-0 outline-green-600 z-10 outline-2 outline"
	style="width: {$scaledWidth}px; height: {$scaledHeight}px;"
>
	<slot />
</div>
