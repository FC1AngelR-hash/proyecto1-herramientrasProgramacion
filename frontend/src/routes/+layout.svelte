<script lang="ts">
	import { ClerkProvider } from 'svelte-clerk';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Administración</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<ClerkProvider
	signInUrl="/sign-in"
	signUpUrl="/sign-up"
	signInFallbackRedirectUrl="/dashboard"
	signUpFallbackRedirectUrl="/dashboard"
	afterSignOutUrl="/sign-in"
>
	{@render children()}
</ClerkProvider>
