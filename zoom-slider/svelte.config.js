import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const githubPagesUrl = '/custom-question-examples/zoom-slider/build';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter(),
		prerender: {
      default: true
    },
		paths: {
			base: process.env.NODE_ENV === "production" ? githubPagesUrl : "",
    },
	}
};

export default config;
