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

<section class="mt-4 mr-auto mb-4 ml-auto flex w-min flex-row items-center rounded-4xl border p-2">
	<!-- This will be a horizontal bar that floats centered at the top of the page on desktop and at the bottom on mobile -->
	<!-- It will allow the user to switch to different sections of the app and will be the main navagational iterface -->
	<nav class="flex w-full flex-row gap-12">
		<ul class="flex w-full flex-row justify-between gap-4">
			<li>
				<a href="/" class="flex size-10 items-center justify-center rounded-full border p-2"
					><Lighthouse stroke-width={1} /></a
				>
			</li>
			<li>
				<a href="/projects" class="flex size-10 items-center justify-center rounded-full border p-2"
					><NotebookPen stroke-width={1} /></a
				>
			</li>
			<li>
				<a href="/library" class="flex size-10 items-center justify-center rounded-full border p-2"
					><BookBookmark stroke-width={1} /></a
				>
			</li>
			<li>
				<a href="/feed" class="flex size-10 items-center justify-center rounded-full border p-2"
					><Newspaper stroke-width={1} /></a
				>
			</li>
		</ul>
		<div class="w-0.5 border-l"></div>
		<ul class="flex w-full flex-row justify-between gap-4">
			<li>
				<div
					id="search-bubble"
					class="flex size-10 items-center justify-center rounded-full border p-2"
				>
					<!-- A bubble with a magnifying glass icon, if pressed it expands to the whole navbar with at the right side to close it, allowing the user to search for people, things, stuff.  -->
					<Search stroke-width={1} />
				</div>
			</li>
			<li>
				<a href="/messages" class="flex size-10 items-center justify-center rounded-full border p-2"
					><MessageSquare stroke-width={1} /></a
				>
			</li>
			<li>
				<div
					id="user-bubble"
					class="flex size-10 items-center justify-center rounded-full border p-2"
				>
					<!-- If user not signed in, clicking the bubble will open a sign in popup -->
					<!-- else their profile picture will be displayed here -->
					<!-- clicking on their picture will open a settings popup -->
					<User stroke-width={1} />
				</div>
			</li>
		</ul>
	</nav>
</section>
