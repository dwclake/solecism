<script lang="ts">
</script>

<div class="page">
	<section id="feed">
		<h2 class="glass-bg panel">Feed</h2>

		<section id="posts" class="glass-bg panel">
			<ul>
				<!-- These should be made into components -->
				<li>
					<div class="card">
						<p>hello</p>
					</div>
				</li>
				<li>
					<div class="card">
						<p>hello</p>
					</div>
				</li>
				<li>
					<div class="card">
						<p>hello</p>
					</div>
				</li>
			</ul>
		</section>
	</section>

	<section id="featured-works">
		<h2 class="glass-bg panel">Featured</h2>

		<div class="groups">
			<section class="glass-bg panel">
				<h3>Poems</h3>
				<ul>
					<!-- These should be made into components -->
					<li>
						<div class="card">
							<p>hello</p>
						</div>
					</li>
					<li>
						<div class="card">
							<p>hello</p>
						</div>
					</li>
					<li>
						<div class="card">
							<p>hello</p>
						</div>
					</li>
				</ul>
			</section>
			<section class="glass-bg panel">
				<h3>Short Stories</h3>
				<ul>
					<li>
						<div class="card">
							<p>hello</p>
						</div>
					</li>
					<li>
						<div class="card">
							<p>hello</p>
						</div>
					</li>
					<li>
						<div class="card">
							<p>hello</p>
						</div>
					</li>
				</ul>
			</section>
		</div>
	</section>
</div>

<style>
	.page {
		z-index: 10;
		display: flex;
		flex: 1;
		justify-content: space-between;
		gap: 1rem;
	}

	#feed,
	#featured-works {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	#feed {
		width: 75%;
	}

	#featured-works {
		width: 25%;
		padding: 0 1rem 1rem;
	}

	.groups {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
		width: 100%;
	}

	/* Glass panels: headings and content sections */
	.panel {
		padding: 1rem;
		border: 2px solid currentColor;
		border-radius: 0.375rem;
		box-shadow: var(--shadow-mirage-950);
	}

	#feed .panel {
		text-shadow: var(--text-shadow-sm-mirage-300);
	}

	#featured-works .panel {
		text-shadow: var(--text-shadow-md-mirage-300);
	}

	h2 {
		font-weight: bold;
		text-align: center;
	}

	h3 {
		padding: 0 1rem 1rem;
		font-weight: bold;
		text-align: center;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
