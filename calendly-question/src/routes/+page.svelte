<script lang="ts">
	import { onMount } from 'svelte';
	import { setAnswerValue, setQuestionSize } from '@formsort/custom-question-api';

	const CALENDLY_BASE_URL = 'https://calendly.com/';
	const CALENDLY_URL_REGEX = new RegExp(`^${CALENDLY_BASE_URL}.+`);

	const height = '800px';

	let error: string;

	let calendlyEl: HTMLDivElement;

	const measureElement = () => {
		setQuestionSize(undefined, 800);
	};

	onMount(() => {
		const params = new URLSearchParams(window.location.search);

		const url = params.get('url');
		if (!url) {
			error = 'You must provide a calendly URL as the  ?url= parameter';
			return;
		}

		if (!url.match(CALENDLY_URL_REGEX)) {
			error = 'Calendly URLs must start with ${CALENDLY_BASE_URL}';
			return;
		}

		Calendly.initInlineWidget({
			url,
			parentElement: calendlyEl,
			prefill: {}
		});

		window.addEventListener('message', function ({ origin, data }) {
			if (origin !== 'https://calendly.com') {
				return;
			}

			// TODO: Only call this on a "load" event?
			measureElement();

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
	<div id="calendly" bind:this={calendlyEl} style:height />
{/if}
