<script lang="ts">
	import { Show } from 'svelte-clerk';
</script>

<main class="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6">
	<p class="text-sm uppercase tracking-[0.25em] text-slate-500">Sistema de administración</p>
	<h1 class="mt-3 text-4xl font-semibold tracking-tight">Panel interno</h1>
	<p class="mt-3 max-w-xl text-slate-600">
		Autenticación con Clerk, roles de admin y operador, y conexión REST con el backend Node.js.
	</p>

	<div class="mt-8 flex gap-3">
		<Show when="signed-out">
			<a
				href="/sign-in"
				class="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
			>
				Iniciar sesión
			</a>
			<a
				href="/sign-up"
				class="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-white"
			>
				Registrarse
			</a>
		</Show>
		<Show when="signed-in">
			<a
				href="/dashboard"
				class="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
			>
				Ir al dashboard
			</a>
			<a href="/sign-out" class="rounded-lg border border-slate-300 px-4 py-2.5 text-sm">
				Cerrar sesión
			</a>
		</Show>
	</div>
</main>
