<script lang="ts">
	import { page } from '$app/state';
	import { SignOutButton, UserButton } from 'svelte-clerk';

	let { title }: { title: string } = $props();
</script>

<header class="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
	<div>
		<p class="text-xs uppercase tracking-wide text-slate-500">{page.url.pathname}</p>
		<h1 class="text-xl font-semibold text-slate-900">{title}</h1>
	</div>
	<div class="flex items-center gap-3">
		<UserButton afterSignOutUrl="/sign-in" />
		<SignOutButton
			redirectUrl="/sign-in"
			class="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
		>
			Cerrar sesión
		</SignOutButton>
	</div>
</header>
