import { requireAdmin } from '$lib/server/guard';
import { backend } from '$lib/services/backend';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await requireAdmin(locals);
	const result = session.token
		? await backend.listAuditLogs(session.token)
		: { ok: false as const, error: 'No hay token de sesión para el backend' };

	return {
		logs: result.ok ? result.data?.logs ?? [] : [],
		error: result.ok ? null : result.error
	};
};
