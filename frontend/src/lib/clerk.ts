export function clerkReady(key = '') {
	return /^pk_(test|live)_/.test(key) && key.length > 40 && !key.includes('xxxxxxxx');
}
