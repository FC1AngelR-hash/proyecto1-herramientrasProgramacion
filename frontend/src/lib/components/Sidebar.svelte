<script lang="ts">
	import { page } from '$app/state';
	import { SignOutButton, UserButton } from 'svelte-clerk';
	import type { AppRole } from '$lib/auth/roles';

	let { role }: { role: AppRole } = $props();

	const links = $derived(
		role === 'admin'
			? [
					{ href: '/dashboard', label: 'Resumen' },
					{ href: '/dashboard/usuarios', label: 'Usuarios' },
					{ href: '/dashboard/auditoria', label: 'Auditoría' }
				]
			: [{ href: '/dashboard', label: 'Panel' }]
	);
</script>

<aside class="flex w-64 flex-col border-r border-slate-200 bg-slate-950 text-slate-100">
	<div class="border-b border-slate-800 px-5 py-6">
		<p class="text-xs uppercase tracking-[0.2em] text-slate-400">Administración</p>
		<p class="mt-1 text-lg font-semibold">Panel interno</p>
	</div>

	<nav class="flex-1 space-y-1 p-3">
		{#each links as link}
			<a
				href={link.href}
				class="block rounded-lg px-3 py-2 text-sm transition {page.url.pathname === link.href
					? 'bg-white/10 text-white'
					: 'text-slate-300 hover:bg-white/5 hover:text-white'}"
			>
				{link.label}
			</a>
		{/each}
	</nav>

	<div class="space-y-3 border-t border-slate-800 p-4">
		<div class="flex items-center justify-between gap-3">
			<UserButton afterSignOutUrl="/sign-in" />
			<span class="rounded-full bg-slate-800 px-2 py-1 text-[11px] uppercase tracking-wide text-slate-300">
				{role}
			</span>
		</div>
		<SignOutButton
			redirectUrl="/sign-in"
			class="w-full rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-100 hover:bg-slate-700"
		>
			Cerrar sesión
		</SignOutButton>
		<a href="/sign-out" class="block text-center text-xs text-slate-400 hover:text-white">
			Ir a /sign-out
		</a>
	</div>
</aside>
