<script lang="ts">
	import type { AuditLog } from '$lib/types/api';

	let { logs = [] }: { logs: AuditLog[] } = $props();
</script>

<div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
	<table class="min-w-full text-left text-sm">
		<thead class="bg-slate-50 text-slate-500">
			<tr>
				<th class="px-4 py-3 font-medium">Fecha</th>
				<th class="px-4 py-3 font-medium">Acción</th>
				<th class="px-4 py-3 font-medium">Entidad</th>
				<th class="px-4 py-3 font-medium">ID</th>
				<th class="px-4 py-3 font-medium">IP</th>
			</tr>
		</thead>
		<tbody>
			{#if logs.length === 0}
				<tr>
					<td colspan="5" class="px-4 py-8 text-center text-slate-500">
						No hay registros de auditoría.
					</td>
				</tr>
			{:else}
				{#each logs as log (log.id)}
					<tr class="border-t border-slate-100">
						<td class="px-4 py-3 text-slate-600">
							{new Date(log.created_at).toLocaleString('es-MX')}
						</td>
						<td class="px-4 py-3 font-medium">{log.action}</td>
						<td class="px-4 py-3">{log.entity}</td>
						<td class="px-4 py-3 font-mono text-xs text-slate-500">{log.entity_id ?? '—'}</td>
						<td class="px-4 py-3 text-slate-500">{log.ip_address ?? '—'}</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
