<script lang="ts">
	import { SignIn } from 'svelte-clerk';
</script>

<section class="flex min-h-screen items-center justify-center bg-slate-100 p-6">
	<div class="w-full max-w-md">
		<SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
	</div>
</section>
