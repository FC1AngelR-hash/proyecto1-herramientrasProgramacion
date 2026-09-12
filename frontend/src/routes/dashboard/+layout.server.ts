import { redirect } from '@sveltejs/kit';
import { requireUser } from '$lib/server/guard';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (typeof locals.auth !== 'function') {
		redirect(307, '/sign-in');
	}
	const session = await requireUser(locals);

	return {
		role: session.role,
		user: {
			id: session.user.id,
			email: session.user.emailAddresses[0]?.emailAddress ?? '',
			name: [session.user.firstName, session.user.lastName].filter(Boolean).join(' ')
		}
	};
};
