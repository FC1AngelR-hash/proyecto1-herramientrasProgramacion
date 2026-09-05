<script lang="ts">
	import AdminsTable from '$lib/components/AdminsTable.svelte';

	let { data, form } = $props();
</script>

{#if data.error}
	<p class="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
		{data.error}. El listado usa el backend REST. Cuando el API acepte el JWT de Clerk, los usuarios
		aparecerán aquí.
	</p>
{/if}

{#if form?.error}
	<p class="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
		{form.error}
	</p>
{/if}

{#if form?.success}
	<p class="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
		Usuario creado.
	</p>
{/if}

<div class="mb-6 rounded-xl border border-slate-200 bg-white p-5">
	<h2 class="text-lg font-semibold">Nuevo administrador u operador</h2>
	<form method="POST" action="?/create" class="mt-4 grid gap-3 md:grid-cols-2">
		<input
			name="fullName"
			required
			placeholder="Nombre completo"
			class="rounded-lg border border-slate-300 px-3 py-2 text-sm"
		/>
		<input
			name="email"
			type="email"
			required
			placeholder="correo@empresa.com"
			class="rounded-lg border border-slate-300 px-3 py-2 text-sm"
		/>
		<input
			name="password"
			type="password"
			required
			minlength="8"
			placeholder="Contraseña (mín. 8)"
			class="rounded-lg border border-slate-300 px-3 py-2 text-sm"
		/>
		<select name="role" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
			<option value="admin">admin</option>
			<option value="operator">operator</option>
			<option value="superadmin">superadmin</option>
		</select>
		<button class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white md:col-span-2">
			Crear usuario
		</button>
	</form>
</div>

<AdminsTable admins={data.admins} />
