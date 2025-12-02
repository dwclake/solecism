import { SveltePlugin } from "bun-plugin-svelte"; // NOTE: not published to npm yet

await Bun.build({
	entrypoints: ["src/mainview/index.ts"],
	outdir: "build/dev-macos-arm64/solecism-dev.app/Contents/Resources/app/views/temp",
	target: "browser",
	sourcemap: true, // sourcemaps not yet supported
	plugins: [
		SveltePlugin({
			development: true // turn off for prod builds. Defaults to false
		})
	]
});

// delete index.js from .../app/views/mainview and move index.js from .../app/views/temp to .../app/views/mainview then delete .../app/views/temp
import fs from "fs/promises";

await fs.unlink(
	"build/dev-macos-arm64/solecism-dev.app/Contents/Resources/app/views/mainview/index.js"
);
await fs.unlink(
	"build/dev-macos-arm64/solecism-dev.app/Contents/Resources/app/views/temp/index.css"
);
await fs.rename(
	"build/dev-macos-arm64/solecism-dev.app/Contents/Resources/app/views/temp/index.js",
	"build/dev-macos-arm64/solecism-dev.app/Contents/Resources/app/views/mainview/index.js"
);
await fs.rename(
	"build/dev-macos-arm64/solecism-dev.app/Contents/Resources/app/views/temp/index.js.map",
	"build/dev-macos-arm64/solecism-dev.app/Contents/Resources/app/views/mainview/index.js.map"
);
// delete any files with .svelte extension from .../app/views/mainview
const files = await fs.readdir(
	"build/dev-macos-arm64/solecism-dev.app/Contents/Resources/app/views/mainview"
);
for (const file of files) {
	if (file.endsWith(".svelte")) {
		await fs.unlink(
			`build/dev-macos-arm64/solecism-dev.app/Contents/Resources/app/views/mainview/${file}`
		);
	}
}

await fs.rmdir(
	"build/dev-macos-arm64/solecism-dev.app/Contents/Resources/app/views/temp"
);
