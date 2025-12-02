export default {
	app: {
		name: "solecism",
		identifier: "solecism.dwclake.me",
		version: "0.0.1"
	},
	build: {
		views: {
			mainview: {
				entrypoint: "src/index.ts",
				external: []
			}
		},
		// Copy only the HTML; CSS is handled by the bundler from source (do not copy generated index.css)
		copy: {
			"src/app.html": "views/mainview/index.html"
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
	}
};
