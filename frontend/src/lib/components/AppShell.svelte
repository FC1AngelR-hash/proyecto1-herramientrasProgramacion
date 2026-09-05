<script lang="ts">
	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';
	import type { AppRole } from '$lib/auth/roles';
	import type { Snippet } from 'svelte';

	let {
		role,
		title,
		children
	}: {
		role: AppRole;
		title: string;
		children: Snippet;
	} = $props();
</script>

<div class="flex min-h-screen">
	<Sidebar {role} />
	<div class="flex min-w-0 flex-1 flex-col">
		<Header {title} />
		<main class="flex-1 p-6">
			{@render children()}
		</main>
	</div>
</div>
