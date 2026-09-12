import { env } from '$env/dynamic/public';
import { clerkReady } from '$lib/clerk';
import { buildClerkProps } from 'svelte-clerk/server';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
	const enabled = clerkReady(env.PUBLIC_CLERK_PUBLISHABLE_KEY);
	return {
		clerkEnabled: enabled,
		...(enabled ? buildClerkProps(locals.auth()) : {})
	};
};
