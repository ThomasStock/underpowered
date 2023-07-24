<script lang="ts">
	import { pixelRatio, scaledHeight, scaledWidth } from 'lib/game';
</script>

<div
	class="m-auto absolute inset-0 border-green-600 z-10 border-solid border-8"
	style="width: {$scaledWidth}px; height: {$scaledHeight}px;"
>
	<slot />
</div>
