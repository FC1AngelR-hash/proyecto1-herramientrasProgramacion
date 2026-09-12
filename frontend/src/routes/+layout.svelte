<script lang="ts">
	import { ClerkProvider } from 'svelte-clerk';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children, data } = $props();
</script>

<svelte:head>
	<title>Aura Detail · Car detailing</title>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if data.clerkEnabled}
	<ClerkProvider
		signInUrl="/sign-in"
		signUpUrl="/sign-up"
		signInFallbackRedirectUrl="/dashboard"
		signUpFallbackRedirectUrl="/dashboard"
		afterSignOutUrl="/"
	>
		{@render children()}
	</ClerkProvider>
{:else}
	{@render children()}
{/if}
