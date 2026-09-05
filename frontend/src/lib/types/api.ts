export type AdminUser = {
	id: string;
	email: string;
	fullName: string;
	role: string;
	isActive: boolean;
	lastLoginAt: string | null;
	createdAt: string;
	updatedAt: string;
};

export type AuditLog = {
	id: string;
	admin_id: string | null;
	action: string;
	entity: string;
	entity_id: string | null;
	metadata: Record<string, unknown> | null;
	ip_address: string | null;
	created_at: string;
};

export type ApiResult<T> = {
	ok: boolean;
	data?: T;
	error?: string;
};
