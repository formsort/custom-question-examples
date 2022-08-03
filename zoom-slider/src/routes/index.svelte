<script lang="ts">
	const min = 1;
	const max = 10;

	// TODO: Get from Formsort the current value
	let selectedValue: number | undefined = undefined;

	const values: number[] = [];
	for (let i = min; i <= max; i++) {
		values.push(i);
	}
</script>

<div role="radiogroup">
	{#each values as value}
		<button
			role="radio"
			aria-checked="false"
			class:selected={value === selectedValue}
			on:click={() => (selectedValue = value)}
		>
			{value}
		</button>
	{/each}
</div>

<style>
	div {
		display: flex;
		gap: 4px;
	}

	button {
		background: transparent;
		border: none;
		display: block;
		width: 120px;
		height: 50px;
		transition: font-size 0.1s ease-in-out;
	}

	button.selected {
		font-size: 150%;
	}
</style>
