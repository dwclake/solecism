export default {
	app: {
		name: "solecism",
		identifier: "solecism.dwclake.me",
		version: "0.0.1"
	},
	build: {
		bun: {
			entrypoint: "bun/index.ts",
			external: []
		},
		views: {
			mainview: {
				entrypoint: "src/dummy.ts",
				external: []
			}
		},
		mac: {
			bundleCEF: false
		},
		linux: {
			bundleCEF: false
		},
		win: {
			bundleCEF: false
		}
	},
	scripts: {
		postBuild: "./scripts/sveltekit.ts"
	}
};
