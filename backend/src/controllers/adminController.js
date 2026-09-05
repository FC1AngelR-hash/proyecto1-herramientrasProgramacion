const { ok, fail, asyncHandler } = require('../utils/http');
const { isEmail, requireFields, ALLOWED_ROLES } = require('../utils/validate');
const { publicAdmin } = require('../utils/serializers');
const adminService = require('../services/adminService');
const auditService = require('../services/auditService');
const { hashPassword, isStrongPassword } = require('../services/authService');

const list = asyncHandler(async (req, res) => {
  const admins = await adminService.listAdmins();
  return ok(res, { admins: admins.map(publicAdmin) });
});

const getById = asyncHandler(async (req, res) => {
  const admin = await adminService.findById(req.params.id);
  if (!admin) return fail(res, 'Administrador no encontrado', 404);
  return ok(res, { admin: publicAdmin(admin) });
});

const create = asyncHandler(async (req, res) => {
  const missing = requireFields(req.body, ['email', 'password', 'fullName', 'role']);
  if (missing.length) {
    return fail(res, `Faltan campos: ${missing.join(', ')}`);
  }

  const { email, password, fullName, role } = req.body;

  if (!isEmail(email)) return fail(res, 'Correo inválido');
  if (!isStrongPassword(password)) {
    return fail(res, 'La contraseña debe tener al menos 8 caracteres');
  }
  if (!ALLOWED_ROLES.includes(role)) {
    return fail(res, `Rol inválido. Usa: ${ALLOWED_ROLES.join(', ')}`);
  }
  if (role === 'superadmin' && req.admin.role !== 'superadmin') {
    return fail(res, 'Solo un superadmin puede crear otro superadmin', 403);
  }

  const exists = await adminService.findByEmail(email);
  if (exists) return fail(res, 'El correo ya está registrado', 409);

  const passwordHash = await hashPassword(password);
  const admin = await adminService.createAdmin({
    email,
    passwordHash,
    fullName,
    role,
  });

  await auditService.logAction({
    adminId: req.admin.id,
    action: 'create',
    entity: 'admins',
    entityId: admin.id,
    metadata: { email: admin.email, role: admin.role },
    ipAddress: req.ip,
  });

  return ok(res, { admin: publicAdmin(admin) }, 201);
});

const update = asyncHandler(async (req, res) => {
  const current = await adminService.findById(req.params.id);
  if (!current) return fail(res, 'Administrador no encontrado', 404);

  const { fullName, role, isActive, password } = req.body;
  const fields = {};

  if (fullName !== undefined) {
    if (!String(fullName).trim()) return fail(res, 'El nombre no puede estar vacío');
    fields.fullName = fullName;
  }

  if (role !== undefined) {
    if (!ALLOWED_ROLES.includes(role)) {
      return fail(res, `Rol inválido. Usa: ${ALLOWED_ROLES.join(', ')}`);
    }
    if (role === 'superadmin' && req.admin.role !== 'superadmin') {
      return fail(res, 'Solo un superadmin puede asignar el rol superadmin', 403);
    }
    fields.role = role;
  }

  if (isActive !== undefined) {
    if (typeof isActive !== 'boolean') {
      return fail(res, 'isActive debe ser true o false');
    }
    if (current.id === req.admin.id && isActive === false) {
      return fail(res, 'No puedes desactivar tu propia cuenta');
    }
    fields.isActive = isActive;
  }

  if (password !== undefined) {
    if (!isStrongPassword(password)) {
      return fail(res, 'La contraseña debe tener al menos 8 caracteres');
    }
    fields.passwordHash = await hashPassword(password);
  }

  if (!Object.keys(fields).length) {
    return fail(res, 'No hay campos para actualizar');
  }

  const admin = await adminService.updateAdmin(current.id, fields);

  await auditService.logAction({
    adminId: req.admin.id,
    action: 'update',
    entity: 'admins',
    entityId: admin.id,
    metadata: { fields: Object.keys(req.body) },
    ipAddress: req.ip,
  });

  return ok(res, { admin: publicAdmin(admin) });
});

const remove = asyncHandler(async (req, res) => {
  const current = await adminService.findById(req.params.id);
  if (!current) return fail(res, 'Administrador no encontrado', 404);

  if (current.id === req.admin.id) {
    return fail(res, 'No puedes eliminar tu propia cuenta');
  }

  if (current.role === 'superadmin' && req.admin.role !== 'superadmin') {
    return fail(res, 'Solo un superadmin puede eliminar a otro superadmin', 403);
  }

  await adminService.deleteAdmin(current.id);

  await auditService.logAction({
    adminId: req.admin.id,
    action: 'delete',
    entity: 'admins',
    entityId: current.id,
    metadata: { email: current.email },
    ipAddress: req.ip,
  });

  return ok(res, { message: 'Administrador eliminado' });
});

module.exports = { list, getById, create, update, remove };
