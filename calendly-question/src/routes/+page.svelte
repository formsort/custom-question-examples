<script lang="ts">
	import { onMount } from 'svelte';
	import { setAnswerValue } from '@formsort/custom-question-api';

	const CALENDLY_BASE_URL = 'https://calendly.com/';
	const CALENDLY_URL_REGEX = new RegExp(`^${CALENDLY_BASE_URL}.+`);

	let error: string;

	let calendlyEl: HTMLDivElement;

	const prefillParameters = ['name', 'first_name', 'last_name', 'email'];

	onMount(() => {
		const params = new URLSearchParams(window.location.search);

		const url = params.get('url');
		if (!url) {
			error = 'You must provide a calendly URL as the ?url= parameter';
			return;
		}

		if (!url.match(CALENDLY_URL_REGEX)) {
			error = 'Calendly URLs must start with ${CALENDLY_BASE_URL}';
			return;
		}

		const prefill: Record<string, string> = {};
		for (const param of prefillParameters) {
			const value = params.get(param);
			if (value != null) {
				prefill[param] = value;
			}
		}

		Calendly.initInlineWidget({
			url,
			parentElement: calendlyEl,
			prefill
		});

		window.addEventListener('message', function ({ origin, data }) {
			if (origin !== 'https://calendly.com') {
				return;
			}

			if (data.event === 'calendly.event_scheduled') {
				const eventUri = data.payload.event.uri;
				setAnswerValue(eventUri);
			}
		});
	});
</script>

<svelte:head>
	<script
		type="text/javascript"
		src="https://assets.calendly.com/assets/external/widget.js"
	></script>
</svelte:head>

{#if error}
	{error}
{:else}
	<div id="calendly" bind:this={calendlyEl} />
{/if}

<style>
	:global(body) {
		margin: 0;
	}

	:global(html),
	:global(body),
	#calendly {
		height: 100%;
	}
</style>
