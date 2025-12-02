#!/usr/bin/env node
/**
 * build.ts
 *
 * Run the SvelteKit static build from the `src/mainview` subfolder, locate the emitted
 * static files, and copy them into the Electrobun app views so the Electrobun
 * BrowserWindow can load the static pages.
 *
 * Usage:
 *   bun run build.ts
 *   node build.ts
 *
 * Assumptions:
 * - There's a SvelteKit project initialized in `src/mainview`.
 * - That SvelteKit app is configured to produce a static/site build (adapter-static or similar).
 * - The Electrobun views root is located at:
 *     build/dev-macos-arm64/solecism-dev.app/Contents/Resources/app/views
 *   (this mirrors the project's previous layout)
 *
 * The script:
 * 1. Invokes a build command inside the `src/mainview` directory. It will try a few common invocations.
 * 2. Locates the static output directory produced by SvelteKit.
 * 3. Copies the static output into `views/mainview`, replacing existing contents.
 *
 * Note: This file is written to be runnable both under Bun and Node. It uses synchronous child
 * process execution for simplicity so subsequent filesystem operations run deterministically.
 */

import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { spawnSync } from "child_process";

type ExecResult = { code: number | null; stdout: string; stderr: string };

/**
 * Run a command synchronously. Try Bun.spawnSync if available (when running under Bun),
 * otherwise use Node's spawnSync.
 */
function runCommandSync(command: string, args: string[], cwd?: string): ExecResult {
	// Try Bun.spawnSync if running in Bun
	try {
		// @ts-ignore - Bun might not exist in Node
		if (typeof Bun !== "undefined" && typeof Bun.spawnSync === "function") {
			// @ts-ignore
			const res = Bun.spawnSync({
				cmd: [command, ...args],
				cwd,
				stdout: "pipe",
				stderr: "pipe"
			});
			return {
				code: res.status ?? null,
				stdout: String(res.stdout ?? ""),
				stderr: String(res.stderr ?? "")
			};
		}
	} catch {
		// fall through to Node spawnSync
	}

	const res = spawnSync(command, args, {
		cwd,
		encoding: "utf8",
		stdio: ["ignore", "pipe", "pipe"],
		shell: false
	});

	return {
		code: res.status ?? null,
		stdout: String(res.stdout ?? ""),
		stderr: String(res.stderr ?? "")
	};
}

async function copyDirRecursive(src: string, dest: string) {
	const entries = await fs.readdir(src, { withFileTypes: true });
	await fs.mkdir(dest, { recursive: true });

	for (const entry of entries) {
		const srcPath = path.join(src, entry.name);
		const destPath = path.join(dest, entry.name);

		if (entry.isDirectory()) {
			await copyDirRecursive(srcPath, destPath);
		} else if (entry.isFile()) {
			await fs.copyFile(srcPath, destPath);
		} else if (entry.isSymbolicLink()) {
			try {
				const real = await fs.readlink(srcPath);
				const resolved = path.resolve(path.dirname(srcPath), real);
				const stat = await fs.stat(resolved);
				if (stat.isDirectory()) {
					await copyDirRecursive(resolved, destPath);
				} else {
					await fs.copyFile(resolved, destPath);
				}
			} catch {
				// ignore broken symlinks
			}
		}
	}
}

async function removeDirContents(dir: string) {
	if (!existsSync(dir)) return;
	const entries = await fs.readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		const p = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			await fs.rm(p, { recursive: true, force: true });
		} else {
			await fs.unlink(p).catch(() => {});
		}
	}
}

/**
 * Locate a static build output under the given root. This function checks common
 * SvelteKit adapter-static output directories.
 */
async function findStaticOutput(root: string): Promise<string | null> {
	const candidates = [
		path.join(root, "build"),
		path.join(root, "build", "client"),
		path.join(root, "dist"),
		path.join(root, "static"),
		path.join(root, "public"),
		path.join(root, "www")
	];

	for (const c of candidates) {
		if (existsSync(c)) {
			// prefer one containing index.html
			if (existsSync(path.join(c, "index.html"))) return c;
			// otherwise accept any non-empty candidate
			try {
				const files = await fs.readdir(c);
				if (files.length > 0) return c;
			} catch {
				// ignore
			}
		}
	}
	return null;
}

/**
 * Run the SvelteKit build inside the sveltekit directory. Try several common invocations
 * and fail if none succeed.
 */
function runSvelteKitBuild(sveltekitDir: string): ExecResult {
	// Try common build commands in order
	const commands: Array<[string, string[]]> = [
		// Bun: use bun run build (if the sveltekit package.json defines a build script)
		["bun", ["run", "build"]],
		// npm/pnpm/pnpm exec or direct svelte-kit
		["npm", ["run", "build"]],
		["pnpm", ["run", "build"]],
		["npx", ["svelte-kit", "build"]],
		["node", ["node_modules/.bin/svelte-kit", "build"]], // direct binary (may not run on windows)
		["node", ["./node_modules/.bin/svelte-kit", "build"]]
	];

	let lastErr: string | null = null;
	for (const [cmd, args] of commands) {
		console.log(
			`Running build command: ${cmd} ${args.join(" ")} (cwd: ${sveltekitDir})`
		);
		const res = runCommandSync(cmd, args, sveltekitDir);
		if (res.code === 0) {
			console.log(`Build succeeded with: ${cmd} ${args.join(" ")}`);
			if (res.stdout) console.log(res.stdout);
			return res;
		}
		lastErr = (res.stderr || res.stdout || `exit ${res.code}`).trim();
		console.warn(`Command failed (${cmd}): ${lastErr}`);
	}

	throw new Error(`SvelteKit build failed. Last error: ${lastErr}`);
}

async function main() {
	const repoRoot = process.cwd();
	const sveltekitDir = path.join(repoRoot, "src", "mainview");

	if (!existsSync(sveltekitDir)) {
		throw new Error(
			`SvelteKit project not found at expected path: ${sveltekitDir}. Please create your SvelteKit project in src/mainview.`
		);
	}

	console.log("Running SvelteKit build in src/mainview:", sveltekitDir);
	// Run the build (synchronously)
	runSvelteKitBuild(sveltekitDir);
	console.log("SvelteKit build finished. Locating static output...");

	// Find static output inside sveltekit folder
	const staticOutput = await findStaticOutput(sveltekitDir);
	if (!staticOutput) {
		throw new Error(
			"Could not find static build output inside sveltekit. Ensure adapter-static is used and the build emits static files (check sveltekit config)."
		);
	}
	console.log("Found static output at:", staticOutput);

	// Electrobun views path (project-specific)
	const electrobunViewsRoot = path.join(
		repoRoot,
		"build",
		"dev-macos-arm64",
		"solecism-dev.app",
		"Contents",
		"Resources",
		"app",
		"views"
	);
	const mainviewTarget = path.join(electrobunViewsRoot, "mainview");
	const tempTarget = path.join(electrobunViewsRoot, "temp");

	console.log("Preparing Electrobun views target:", mainviewTarget);
	// Ensure parent exists
	await fs.mkdir(electrobunViewsRoot, { recursive: true });

	// Clean temp, then copy static output into temp
	await fs.rm(tempTarget, { recursive: true, force: true }).catch(() => {});
	await fs.mkdir(tempTarget, { recursive: true });

	console.log(`Copying static files from "${staticOutput}" to "${tempTarget}" ...`);
	await copyDirRecursive(staticOutput, tempTarget);
	console.log("Copy into temp finished.");

	// Clear existing mainview contents
	await fs.mkdir(mainviewTarget, { recursive: true });
	console.log(`Clearing existing contents of "${mainviewTarget}" ...`);
	await removeDirContents(mainviewTarget);

	// Move/copy files from temp to mainview
	console.log(`Moving static files into "${mainviewTarget}" ...`);
	await copyDirRecursive(tempTarget, mainviewTarget);

	// Remove temp
	await fs.rm(tempTarget, { recursive: true, force: true }).catch(() => {});

	// Optionally remove any stray .svelte files (leftovers from older build approach)
	try {
		const items = await fs.readdir(mainviewTarget);
		for (const it of items) {
			if (it.endsWith(".svelte")) {
				await fs.unlink(path.join(mainviewTarget, it)).catch(() => {});
			}
		}
	} catch {
		// ignore
	}

	console.log("Static site copied to Electrobun views/mainview successfully.");
}

main().catch((err) => {
	console.error("Error:", err && (err.stack ?? err.message ?? String(err)));
	process.exitCode = 1;
});
