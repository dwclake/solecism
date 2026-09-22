<script lang="ts">
	let { children } = $props();
</script>

<button class="btn">
	{@render children()}
</button>

<style>
	.btn {
		border: 2px solid currentColor;
	}
</style>
