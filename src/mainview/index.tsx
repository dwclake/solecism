/** @jsxImportSource solid-js */
import { render } from "solid-js/web";
import { createSignal, createEffect } from "solid-js";
import "./index.css";

function App() {
	const [count, setCount] = createSignal(0);
	const [dark, setDark] = createSignal(false);

	createEffect(() => {
		document.documentElement.classList.toggle("dark", dark());
	});

	return (
		<div class="container">
			<h1>Hello Electrobun! 🎉</h1>
			<p class="subtitle">A fast, cross-platform desktop app framework</p>

			<div class="welcome-section">
				<p>
					Welcome to your first Electrobun app! This framework combines the
					power of Bun with native desktop capabilities and SolidJS for a
					reactive UI.
				</p>

				<h2>What is Electrobun?</h2>
				<ul>
					<li>
						<strong>Fast:</strong> Built on Bun&apos;s lightning-fast
						JavaScript runtime
					</li>
					<li>
						<strong>Native:</strong> Access to system APIs like menus, trays,
						and file dialogs
					</li>
					<li>
						<strong>Cross-platform:</strong> Works on macOS, Windows, and
						Linux
					</li>
					<li>
						<strong>Web-based UI:</strong> Use familiar HTML, CSS, and
						JavaScript for your interface
					</li>
				</ul>

				<h2>SolidJS quick demo</h2>
				<div class="links">
					<button
						class="doc-link"
						onClick={() => setCount((c) => c + 1)}
						type="button"
					>
						Count: {count()}
					</button>
					<button
						class="doc-link"
						onClick={() => setDark((d) => !d)}
						type="button"
					>
						Toggle {dark() ? "Light" : "Dark"} Mode
					</button>
				</div>

				<h2>Get Started</h2>
				<p>
					Ready to build something amazing? Check out the documentation and
					examples:
				</p>

				<div class="links">
					<a href="https://electrobun.dev/" class="doc-link">
						📚 Electrobun
					</a>
					<a href="https://github.com/blackboardsh/electrobun" class="doc-link">
						🐙 GitHub Repository
					</a>
					<a href="https://electrobun.dev/docs/apis/bun/" class="doc-link">
						💡 Api Docs
					</a>
				</div>
			</div>

			<div class="footer">
				<p>
					Edit <code>src/bun/index.ts</code> and <code>src/mainview/</code> to
					customize your app
				</p>
			</div>
		</div>
	);
}

const root = document.getElementById("root");
if (root) {
	render(() => <App />, root);
} else {
	// In case the HTML hasn't created a #root, fail gracefully
	console.error("Root element #root not found");
}
