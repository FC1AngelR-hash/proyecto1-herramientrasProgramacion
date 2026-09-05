function isEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function requireFields(body, fields) {
  const missing = fields.filter((field) => {
    const value = body[field];
    return value === undefined || value === null || String(value).trim() === '';
  });
  return missing;
}

const ALLOWED_ROLES = ['superadmin', 'admin', 'operator'];

module.exports = { isEmail, requireFields, ALLOWED_ROLES };
