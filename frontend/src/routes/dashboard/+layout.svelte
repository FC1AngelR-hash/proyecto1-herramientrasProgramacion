<script lang="ts">
	import AppShell from '$lib/components/AppShell.svelte';
	import { page } from '$app/state';

	let { children, data } = $props();

	const titles = $derived({
		'/dashboard': data.role === 'admin' ? 'Resumen de administración' : 'Panel del operador',
		'/dashboard/usuarios': 'Gestión de usuarios',
		'/dashboard/auditoria': 'Logs de auditoría'
	} as Record<string, string>);

	const title = $derived(titles[page.url.pathname] ?? 'Dashboard');
</script>

<AppShell role={data.role} {title}>
	{@render children()}
</AppShell>
