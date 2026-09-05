<script lang="ts">
	import AuditLogs from '$lib/components/AuditLogs.svelte';

	let { data } = $props();
</script>

{#if data.error}
	<p class="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
		{data.error}
	</p>
{/if}

<AuditLogs logs={data.logs} />
