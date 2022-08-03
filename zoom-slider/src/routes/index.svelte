<script lang="ts">
	import { setAnswerValue, getAnswerValue, clearAnswerValue } from '@formsort/custom-question-api';
	import { onMount } from 'svelte';
	import chroma from 'chroma-js';

	const min = 1;
	const max = 10;
	const lightColor = '7A9AC4';
	const darkColor = 'ED7032';

	let selectedValue: number | undefined = undefined;
	let hoverValue: number | undefined = undefined;

	const scale = chroma.scale([lightColor, darkColor]);

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

<div role="radiogroup" on:mouseleave={() => (hoverValue = undefined)}>
	{#each values as value, idx}
		<button
			role="radio"
			aria-checked="false"
			style={`color: ${scale(idx / (max - min))}`}
			class:neighbor={(selectedValue != null && Math.abs(selectedValue - value) === 1) ||
				(hoverValue != null && Math.abs(hoverValue - value) === 1)}
			class:selected={value === selectedValue || value === hoverValue}
			on:mouseenter={() => (hoverValue = value)}
			on:click={() => toggleValue(value)}
		>
			{value}
		</button>
	{/each}
</div>

<style>
	:global(body) {
		margin: 0;
	}

	div {
		display: flex;
	}

	button {
		background: transparent;
		border: none;
		display: inline;
		width: 120px;
		height: 50px;
		transition: all 0.1s ease-in-out;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		opacity: 0.5;
		padding: 0;
		cursor: pointer;
	}

	button.neighbor {
		font-size: 105%;
		opacity: 0.6;
		transform: translateY(0.5%);
	}

	button.selected {
		font-size: 200%;
		opacity: 1;
		transform: translateY(7.5%);
	}
</style>
