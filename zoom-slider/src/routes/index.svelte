<script lang="ts">
	import { setAnswerValue, getAnswerValue, clearAnswerValue } from '@formsort/custom-question-api';
	import { onMount } from 'svelte';
	import chroma from 'chroma-js';

	const min = 1;
	const max = 10;

	const lightColor = 'BFD44F';
	const darkColor = 'FF6200';

	let selectedValue: number | undefined = undefined;
	let hoverValue: number | undefined = undefined;

	const scale = chroma.scale([lightColor, darkColor]);

	onMount(async () => {
		selectedValue = await getAnswerValue();
	});

	const clearValue = () => {
		selectedValue = undefined;
		clearAnswerValue();
	};

	const setValue = (newValue: number) => {
		hoverValue = undefined;
		selectedValue = newValue;
		setAnswerValue(newValue);
	};

	const toggleValue = (newValue: number) => {
		if (selectedValue != null && newValue === selectedValue) {
			clearValue();
		} else {
			setValue(newValue);
		}
	};

	const onTouchMove = (e: TouchEvent) => {
		e.preventDefault();
		const location = e.changedTouches[0];
		const target = document.elementFromPoint(location.clientX, location.clientY);
		if (!target) {
			return;
		}
		const datasetValue = (target as HTMLElement).dataset['zoomSliderValue'];
		if (!datasetValue) {
			return;
		}
		const newValue = parseInt(datasetValue);
		if (newValue !== selectedValue) {
			setValue(newValue);
		}
	};

	const values: number[] = [];
	for (let i = min; i <= max; i++) {
		values.push(i);
	}
</script>

<div on:mouseleave={() => (hoverValue = undefined)} on:touchmove={onTouchMove}>
	{#each values as value, idx}
		<button
			role="radio"
			aria-checked="false"
			data-zoom-slider-value={value}
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
		/* outline: 1px solid red; */
		background: transparent;
		border: none;
		display: inline;
		font-size: 12px;
		width: 120px;
		height: 85px;
		padding: 0 0 20px 0;
		transition: all 0.1s ease-in-out;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		opacity: 0.5;
		cursor: pointer;
	}

	button.neighbor {
		font-size: 105%;
		opacity: 0.6;
		transform: translateY(0.5%);
	}

	button.selected {
		font-size: 80px;
		opacity: 1;
		transform: translateY(20%);
	}
</style>
