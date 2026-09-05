export type AppRole = 'admin' | 'operador';

const ADMIN_VALUES = new Set(['admin', 'superadmin']);
const OPERATOR_VALUES = new Set(['operador', 'operator']);

function readRawRole(source: unknown): string | null {
	if (!source || typeof source !== 'object') return null;
	const record = source as Record<string, unknown>;
	const role = record.role ?? record.rol;
	return typeof role === 'string' ? role : null;
}

export function resolveAppRole(
	sessionClaims?: Record<string, unknown> | null,
	publicMetadata?: Record<string, unknown> | null
): AppRole {
	const raw =
		readRawRole(publicMetadata) ??
		readRawRole(sessionClaims?.metadata as Record<string, unknown> | undefined) ??
		readRawRole(sessionClaims?.publicMetadata as Record<string, unknown> | undefined) ??
		readRawRole(sessionClaims);

	const value = (raw ?? 'operador').toLowerCase().trim();
	if (ADMIN_VALUES.has(value)) return 'admin';
	if (OPERATOR_VALUES.has(value)) return 'operador';
	return 'operador';
}

export function isAdmin(role: AppRole | undefined) {
	return role === 'admin';
}
