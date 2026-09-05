import { env } from '$env/dynamic/private';
import { Resend } from 'resend';

type EmailPayload = {
	to: string | string[];
	subject: string;
	html: string;
};

export async function sendNotificationEmail(payload: EmailPayload) {
	const apiKey = env.RESEND_API_KEY;
	const from = env.RESEND_FROM_EMAIL || 'Sistema <noreply@example.com>';

	if (!apiKey) {
		return { ok: false, skipped: true, error: 'RESEND_API_KEY no está configurada' };
	}

	const resend = new Resend(apiKey);
	const { data, error } = await resend.emails.send({
		from,
		to: payload.to,
		subject: payload.subject,
		html: payload.html
	});

	if (error) {
		return { ok: false, skipped: false, error: error.message };
	}

	return { ok: true, skipped: false, id: data?.id };
}
