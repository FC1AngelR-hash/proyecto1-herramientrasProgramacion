<script lang="ts">
	let { data } = $props();
</script>

{#if data.role === 'admin'}
	<section class="grid gap-4 md:grid-cols-3">
		<a href="/dashboard/usuarios" class="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300">
			<p class="text-sm text-slate-500">Usuarios</p>
			<p class="mt-2 text-lg font-semibold">Administradores y operadores</p>
		</a>
		<a href="/dashboard/auditoria" class="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300">
			<p class="text-sm text-slate-500">Auditoría</p>
			<p class="mt-2 text-lg font-semibold">Actividad del sistema</p>
		</a>
		<div class="rounded-xl border border-slate-200 bg-white p-5">
			<p class="text-sm text-slate-500">Sesión</p>
			<p class="mt-2 text-lg font-semibold">{data.user.email || data.user.name}</p>
		</div>
	</section>
{:else}
	<section class="max-w-2xl rounded-xl border border-slate-200 bg-white p-6">
		<p class="text-sm uppercase tracking-wide text-slate-500">Operador</p>
		<h2 class="mt-1 text-2xl font-semibold">Hola{data.user.name ? `, ${data.user.name}` : ''}</h2>
		<p class="mt-3 text-slate-600">
			Este panel está restringido. Puedes consultar el estado general, pero la gestión de usuarios y
			la auditoría quedan reservadas al rol admin.
		</p>
		<dl class="mt-6 grid gap-3 text-sm">
			<div class="rounded-lg bg-slate-50 p-3">
				<dt class="text-slate-500">Correo</dt>
				<dd class="font-medium">{data.user.email || '—'}</dd>
			</div>
			<div class="rounded-lg bg-slate-50 p-3">
				<dt class="text-slate-500">Rol</dt>
				<dd class="font-medium capitalize">{data.role}</dd>
			</div>
		</dl>
	</section>
{/if}
