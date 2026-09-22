<script lang="ts">
	import {
		BookBookmark,
		MessageSquare,
		Newspaper,
		NotebookPen,
		Search,
		User,
		X
	} from '@lucide/svelte';
</script>

<section>
	<!-- This will be a horizontal bar that floats centered at the top of the page on desktop and at the bottom on mobile -->
	<!-- It will allow the user to switch to different sections of the app and will be the main navagational iterface -->
	<nav>
		<ul>
			<!-- These should be made into components, consider text instead of icons -->
			<li>
				<a href="/" class="bubble hover click">
					<Newspaper stroke-width={1.5} />
					<p>Home</p>
				</a>
			</li>
			<li>
				<!-- Make this a bubble component maybe -->
				<a href="/projects" class="bubble hover click">
					<NotebookPen stroke-width={1.5} />
					<p>Projects</p>
				</a>
			</li>
			<li>
				<a href="/library" class="bubble hover click">
					<BookBookmark stroke-width={1.5} />
					<p>Library</p>
				</a>
			</li>
			<li>
				<div id="search-bubble" class="bubble hover click">
					<!-- A bubble with a magnifying glass icon, if pressed it expands to the whole navbar with at the right side to close it, allowing the user to search for people, things, stuff.  -->
					<Search stroke-width={1.5} />
					<p>Search</p>
				</div>
			</li>
		</ul>
		<div class="divider"></div>
		<ul>
			<li>
				<a href="/messages" class="bubble hover click">
					<MessageSquare stroke-width={1.5} />
					<p>Messages</p>
				</a>
			</li>
			<li>
				<div id="user-bubble" class="bubble hover click">
					<!-- If user not signed in, clicking the bubble will open a sign in popup -->
					<!-- else their profile picture will be displayed here -->
					<!-- clicking on their picture will open a settings popup -->
					<User stroke-width={1.5} />
					<p>Profile</p>
				</div>
			</li>
		</ul>
	</nav>
</section>

<style>
	section {
		z-index: 10;
		display: flex;
		width: 100%;
		height: 100%;
		padding: 1rem;
	}

	nav {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		width: 100%;
	}

	ul {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1rem;
		width: 100%;
	}

	p {
		padding-left: 1rem;
	}

	.divider {
		height: 0.125rem;
		border: 1px solid currentColor;
	}
</style>
