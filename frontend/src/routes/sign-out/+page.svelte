<script lang="ts">
	import { ClerkLoaded, useClerkContext } from 'svelte-clerk';

	const ctx = useClerkContext();

	$effect(() => {
		if (ctx.isLoaded && ctx.clerk) {
			void ctx.clerk.signOut({ redirectUrl: '/sign-in' });
		}
	});
</script>

<section class="flex min-h-screen items-center justify-center bg-slate-100">
	<ClerkLoaded>
		<p class="text-slate-600">Cerrando sesión...</p>
	</ClerkLoaded>
</section>
