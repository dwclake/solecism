<script lang="ts">
	import {
		BookBookmark,
		Lighthouse,
		MessageSquare,
		Newspaper,
		NotebookPen,
		Search,
		User,
		X
	} from '@lucide/svelte';
</script>

<section class="z-10 flex size-full flex-col items-center p-2">
	<!-- This will be a horizontal bar that floats centered at the top of the page on desktop and at the bottom on mobile -->
	<!-- It will allow the user to switch to different sections of the app and will be the main navagational iterface -->
	<nav class="flex w-full flex-col gap-6">
		<ul class="flex w-full flex-col justify-between gap-2">
			<!-- These should be made into components, consider text instead of icons -->
			<li>
				<a href="/" class="bubble hover click h-7">
					<!--<Lighthouse stroke-width={1.5} />-->
					<p>Home</p>
				</a>
			</li>
			<li>
				<!-- Make this a bubble component maybe -->
				<a href="/projects" class="bubble hover click h-7">
					<!--<NotebookPen stroke-width={1.5} />-->
					<p>Projects</p>
				</a>
			</li>
			<li>
				<a href="/library" class="bubble hover click h-7">
					<!--<BookBookmark stroke-width={1.5} />-->
					<p>Library</p>
				</a>
			</li>
			<li>
				<a href="/feed" class="bubble hover click h-7">
					<!--<Newspaper stroke-width={1.5} />-->
					<p>Feed</p>
				</a>
			</li>
		</ul>
		<div class="h-0.5 border"></div>
		<ul class="flex w-full flex-col justify-between gap-2">
			<li>
				<div id="search-bubble" class="bubble hover click h-7">
					<!-- A bubble with a magnifying glass icon, if pressed it expands to the whole navbar with at the right side to close it, allowing the user to search for people, things, stuff.  -->
					<!--<Search stroke-width={1.5} />-->
					<p>Search</p>
				</div>
			</li>
			<li>
				<a href="/messages" class="bubble hover click h-7">
					<!--<MessageSquare stroke-width={1.5} />-->
					<p>Messages</p>
				</a>
			</li>
			<li>
				<div id="user-bubble" class="bubble hover click h-7">
					<!-- If user not signed in, clicking the bubble will open a sign in popup -->
					<!-- else their profile picture will be displayed here -->
					<!-- clicking on their picture will open a settings popup -->
					<!--<User stroke-width={1.5} />-->
					<p>Profile</p>
				</div>
			</li>
		</ul>
	</nav>
</section>

<style>
</style>
