import { env } from '$env/dynamic/public';
import { clerkReady } from '$lib/clerk';
import { withClerkHandler } from 'svelte-clerk/server';
import type { Handle } from '@sveltejs/kit';

const clerk = withClerkHandler();

export const handle: Handle = async (input) => {
	if (!clerkReady(env.PUBLIC_CLERK_PUBLISHABLE_KEY)) {
		input.event.locals.auth = () => ({ userId: null } as never);
		return input.resolve(input.event);
	}
	return clerk(input);
};
