/// <reference types="svelte-clerk/env" />

import type { AppRole } from '$lib/auth/roles';

declare global {
	namespace App {
		interface Locals {
			role?: AppRole;
		}
		interface PageData {
			role?: AppRole;
		}
	}
}

export {};
