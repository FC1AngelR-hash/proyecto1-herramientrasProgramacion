const { supabase } = require('../config/supabase');

async function logAction({ adminId, action, entity, entityId, metadata, ipAddress }) {
  const { error } = await supabase.from('audit_logs').insert({
    admin_id: adminId || null,
    action,
    entity,
    entity_id: entityId ? String(entityId) : null,
    metadata: metadata || null,
    ip_address: ipAddress || null,
  });

  if (error) {
    console.error('No se pudo guardar auditoría:', error.message);
  }
}

async function listLogs({ limit = 50 } = {}) {
  const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 200);

  const { data, error } = await supabase
    .from('audit_logs')
    .select('id, admin_id, action, entity, entity_id, metadata, ip_address, created_at')
    .order('created_at', { ascending: false })
    .limit(safeLimit);

  if (error) throw error;
  return data || [];
}

module.exports = { logAction, listLogs };
