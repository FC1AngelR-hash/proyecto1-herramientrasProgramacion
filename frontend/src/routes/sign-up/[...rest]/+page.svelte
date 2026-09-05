<script lang="ts">
	import { SignUp } from 'svelte-clerk';
</script>

<section class="flex min-h-screen items-center justify-center bg-slate-100 p-6">
	<div class="w-full max-w-md">
		<SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
	</div>
</section>
