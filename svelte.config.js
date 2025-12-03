import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: "dist",
			assets: "dist",
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		alias: {
			$components: "src/components",
			$assets: "src/lib/assets",
			$state: "src/lib/state.svelte.ts"
		},
		csp: {
			directives: {
				"script-src": ["self"]
			},
			reportOnly: {
				"script-src": ["self"],
				"report-uri": ["/"]
			}
		}
	},

	compilerOptions: {
		experimental: {
			async: true
		}
	}
};

export default config;
