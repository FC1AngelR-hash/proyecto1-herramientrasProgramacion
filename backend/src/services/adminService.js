const { supabase } = require('../config/supabase');

const ADMIN_COLUMNS =
  'id, email, password_hash, full_name, role, is_active, last_login_at, created_at, updated_at';

async function findByEmail(email) {
  const { data, error } = await supabase
    .from('admins')
    .select(ADMIN_COLUMNS)
    .eq('email', email.toLowerCase().trim())
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function findById(id) {
  const { data, error } = await supabase
    .from('admins')
    .select(ADMIN_COLUMNS)
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function countAdmins() {
  const { count, error } = await supabase
    .from('admins')
    .select('id', { count: 'exact', head: true });

  if (error) throw error;
  return count || 0;
}

async function listAdmins() {
  const { data, error } = await supabase
    .from('admins')
    .select(ADMIN_COLUMNS)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

async function createAdmin({ email, passwordHash, fullName, role }) {
  const { data, error } = await supabase
    .from('admins')
    .insert({
      email: email.toLowerCase().trim(),
      password_hash: passwordHash,
      full_name: fullName.trim(),
      role,
    })
    .select(ADMIN_COLUMNS)
    .single();

  if (error) throw error;
  return data;
}

async function updateAdmin(id, fields) {
  const payload = {};
  if (fields.fullName !== undefined) payload.full_name = fields.fullName.trim();
  if (fields.role !== undefined) payload.role = fields.role;
  if (fields.isActive !== undefined) payload.is_active = fields.isActive;
  if (fields.passwordHash !== undefined) payload.password_hash = fields.passwordHash;
  if (fields.lastLoginAt !== undefined) payload.last_login_at = fields.lastLoginAt;

  const { data, error } = await supabase
    .from('admins')
    .update(payload)
    .eq('id', id)
    .select(ADMIN_COLUMNS)
    .single();

  if (error) throw error;
  return data;
}

async function deleteAdmin(id) {
  const { error } = await supabase.from('admins').delete().eq('id', id);
  if (error) throw error;
}

module.exports = {
  findByEmail,
  findById,
  countAdmins,
  listAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
