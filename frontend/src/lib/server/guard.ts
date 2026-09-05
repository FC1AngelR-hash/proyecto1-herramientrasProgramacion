import { error, redirect } from '@sveltejs/kit';
import { clerkClient } from 'svelte-clerk/server';
import { isAdmin, resolveAppRole, type AppRole } from '$lib/auth/roles';

type AuthState = ReturnType<App.Locals['auth']> & {
	getToken?: (options?: { template?: string }) => Promise<string | null>;
};

function getToken(auth: AuthState) {
	return auth.getToken?.() ?? Promise.resolve(null);
}

export async function requireUser(locals: App.Locals) {
	const auth = locals.auth() as AuthState;
	if (!auth.userId) {
		redirect(307, '/sign-in');
	}

	const user = await clerkClient.users.getUser(auth.userId);
	const role = resolveAppRole(
		auth.sessionClaims as Record<string, unknown> | null,
		user.publicMetadata as Record<string, unknown>
	);

	return {
		auth,
		user,
		role,
		token: await getToken(auth)
	};
}

export async function requireRole(locals: App.Locals, allowed: AppRole[]) {
	const session = await requireUser(locals);
	if (!allowed.includes(session.role)) {
		if (isAdmin(session.role)) {
			redirect(303, '/dashboard');
		}
		redirect(303, '/dashboard');
	}
	return session;
}

export async function requireAdmin(locals: App.Locals) {
	const session = await requireUser(locals);
	if (!isAdmin(session.role)) {
		error(403, 'Esta sección es solo para administradores');
	}
	return session;
}
