import { json } from '@sveltejs/kit';
import { requireAdmin } from '$lib/server/guard';
import { sendNotificationEmail } from '$lib/services/resend';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	await requireAdmin(locals);
	const body = (await request.json()) as {
		to?: string;
		subject?: string;
		html?: string;
	};

	if (!body.to || !body.subject || !body.html) {
		return json({ ok: false, error: 'Faltan to, subject o html' }, { status: 400 });
	}

	const result = await sendNotificationEmail({
		to: body.to,
		subject: body.subject,
		html: body.html
	});

	return json(result, { status: result.ok ? 200 : 400 });
};
