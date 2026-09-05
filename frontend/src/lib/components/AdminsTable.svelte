<script lang="ts">
	import type { AdminUser } from '$lib/types/api';

	let { admins = [] }: { admins: AdminUser[] } = $props();
</script>

<div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
	<table class="min-w-full text-left text-sm">
		<thead class="bg-slate-50 text-slate-500">
			<tr>
				<th class="px-4 py-3 font-medium">Nombre</th>
				<th class="px-4 py-3 font-medium">Correo</th>
				<th class="px-4 py-3 font-medium">Rol</th>
				<th class="px-4 py-3 font-medium">Estado</th>
				<th class="px-4 py-3 font-medium">Último acceso</th>
			</tr>
		</thead>
		<tbody>
			{#if admins.length === 0}
				<tr>
					<td colspan="5" class="px-4 py-8 text-center text-slate-500">
						No hay usuarios para mostrar.
					</td>
				</tr>
			{:else}
				{#each admins as admin (admin.id)}
					<tr class="border-t border-slate-100">
						<td class="px-4 py-3 font-medium text-slate-900">{admin.fullName}</td>
						<td class="px-4 py-3 text-slate-600">{admin.email}</td>
						<td class="px-4 py-3 capitalize">{admin.role}</td>
						<td class="px-4 py-3">
							<span
								class="rounded-full px-2 py-1 text-xs {admin.isActive
									? 'bg-emerald-50 text-emerald-700'
									: 'bg-slate-100 text-slate-500'}"
							>
								{admin.isActive ? 'Activo' : 'Inactivo'}
							</span>
						</td>
						<td class="px-4 py-3 text-slate-500">
							{admin.lastLoginAt ? new Date(admin.lastLoginAt).toLocaleString('es-MX') : '—'}
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
