function publicAdmin(admin) {
  if (!admin) return null;
  return {
    id: admin.id,
    email: admin.email,
    fullName: admin.full_name,
    role: admin.role,
    isActive: admin.is_active,
    lastLoginAt: admin.last_login_at,
    createdAt: admin.created_at,
    updatedAt: admin.updated_at,
  };
}

module.exports = { publicAdmin };
