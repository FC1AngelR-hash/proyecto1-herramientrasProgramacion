import { fail } from '@sveltejs/kit';
import { requireAdmin } from '$lib/server/guard';
import { backend } from '$lib/services/backend';
import { sendNotificationEmail } from '$lib/services/resend';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await requireAdmin(locals);
	const result = session.token
		? await backend.listAdmins(session.token)
		: { ok: false as const, error: 'No hay token de sesión para el backend' };

	return {
		admins: result.ok ? result.data?.admins ?? [] : [],
		error: result.ok ? null : result.error
	};
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const session = await requireAdmin(locals);
		const form = await request.formData();
		const payload = {
			email: String(form.get('email') ?? ''),
			password: String(form.get('password') ?? ''),
			fullName: String(form.get('fullName') ?? ''),
			role: String(form.get('role') ?? 'operator')
		};

		if (!session.token) {
			return fail(401, { error: 'No hay token para autenticar el backend' });
		}

		const result = await backend.createAdmin(session.token, payload);
		if (!result.ok) {
			return fail(400, { error: result.error });
		}

		await sendNotificationEmail({
			to: payload.email,
			subject: 'Acceso al sistema de administración',
			html: `<p>Hola ${payload.fullName},</p><p>Tu cuenta con rol <strong>${payload.role}</strong> fue creada.</p>`
		});

		return { success: true };
	}
};
