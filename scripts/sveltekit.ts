import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { $ } from "bun";

const isDev = !!process.env.ELECTROBUN_SVELTE_DEV;

if (!isDev) {
	async function clean() {
		const distPath = "./dist";

		async function removeDirContents(dir: string) {
			try {
				const entries = await fs.readdir(dir, { withFileTypes: true });
				for (const entry of entries) {
					const p = `${dir}/${entry.name}`;
					if (entry.isDirectory()) {
						await fs.rm(p, { recursive: true, force: true });
					} else {
						await fs.unlink(p).catch(() => {});
					}
				}
			} catch {
				// ignore errors
			}
		}

		await removeDirContents(distPath);
	}

	clean();
	await $`bun --bun run svelte:build`;
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
	const candidates = [path.join(root, "dist")];

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

async function main() {
	const repoRoot = process.cwd();

	// Find static output inside sveltekit folder
	const staticOutput = await findStaticOutput(repoRoot);
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
