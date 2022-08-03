<script lang="ts">
	import { setAnswerValue, getAnswerValue, clearAnswerValue } from '@formsort/custom-question-api';
	import { onMount } from 'svelte';

	const min = 1;
	const max = 10;
	let selectedValue: number | undefined = undefined;

	onMount(async () => {
		selectedValue = await getAnswerValue();
	});

	const toggleValue = (newValue: number) => {
		if (selectedValue != null && newValue === selectedValue) {
			selectedValue = undefined;
			clearAnswerValue();
		} else {
			selectedValue = newValue;
			setAnswerValue(newValue);
		}
	};

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
			class:neighbor={selectedValue != null && Math.abs(selectedValue - value) === 1}
			class:selected={value === selectedValue}
			on:click={() => toggleValue(value)}
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
		font-size: 175%;
	}

	button.neighbor {
		font-size: 105%;
	}
</style>
