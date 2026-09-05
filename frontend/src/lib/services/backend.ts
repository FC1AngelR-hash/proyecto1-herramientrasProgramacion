import { env } from '$env/dynamic/public';
import type { AdminUser, ApiResult, AuditLog } from '$lib/types/api';

const backendUrl = () => env.PUBLIC_BACKEND_URL || 'http://localhost:3000';

type RequestOptions = {
	token?: string | null;
	method?: string;
	body?: unknown;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<ApiResult<T>> {
	try {
		const response = await fetch(`${backendUrl()}${path}`, {
			method: options.method ?? 'GET',
			headers: {
				'Content-Type': 'application/json',
				...(options.token ? { Authorization: `Bearer ${options.token}` } : {})
			},
			body: options.body ? JSON.stringify(options.body) : undefined
		});

		const payload = (await response.json().catch(() => null)) as ApiResult<T> | null;
		if (!response.ok || !payload?.ok) {
			return {
				ok: false,
				error: payload?.error || `Error ${response.status} al contactar el backend`
			};
		}

		return payload;
	} catch (error) {
		return {
			ok: false,
			error: error instanceof Error ? error.message : 'No se pudo conectar con el backend'
		};
	}
}

export const backend = {
	health: () => request<{ status: string; env: string }>('/api/health'),
	listAdmins: (token: string) => request<{ admins: AdminUser[] }>('/api/admins', { token }),
	getAdmin: (token: string, id: string) =>
		request<{ admin: AdminUser }>(`/api/admins/${id}`, { token }),
	createAdmin: (
		token: string,
		body: { email: string; password: string; fullName: string; role: string }
	) => request<{ admin: AdminUser }>('/api/admins', { token, method: 'POST', body }),
	updateAdmin: (
		token: string,
		id: string,
		body: Partial<{ fullName: string; role: string; isActive: boolean; password: string }>
	) => request<{ admin: AdminUser }>(`/api/admins/${id}`, { token, method: 'PATCH', body }),
	deleteAdmin: (token: string, id: string) =>
		request<{ message: string }>(`/api/admins/${id}`, { token, method: 'DELETE' }),
	listAuditLogs: (token: string, limit = 50) =>
		request<{ logs: AuditLog[] }>(`/api/audit-logs?limit=${limit}`, { token })
};
