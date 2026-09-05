const { ok, fail, asyncHandler } = require('../utils/http');
const { isEmail, requireFields } = require('../utils/validate');
const { publicAdmin } = require('../utils/serializers');
const adminService = require('../services/adminService');
const auditService = require('../services/auditService');
const {
  hashPassword,
  verifyPassword,
  signToken,
  isStrongPassword,
} = require('../services/authService');

const bootstrap = asyncHandler(async (req, res) => {
  const missing = requireFields(req.body, ['email', 'password', 'fullName']);
  if (missing.length) {
    return fail(res, `Faltan campos: ${missing.join(', ')}`);
  }

  const { email, password, fullName } = req.body;

  if (!isEmail(email)) return fail(res, 'Correo inválido');
  if (!isStrongPassword(password)) {
    return fail(res, 'La contraseña debe tener al menos 8 caracteres');
  }

  const total = await adminService.countAdmins();
  if (total > 0) {
    return fail(res, 'El sistema ya tiene un administrador. Usa /api/auth/login', 409);
  }

  const passwordHash = await hashPassword(password);
  const admin = await adminService.createAdmin({
    email,
    passwordHash,
    fullName,
    role: 'superadmin',
  });

  await auditService.logAction({
    adminId: admin.id,
    action: 'bootstrap',
    entity: 'admins',
    entityId: admin.id,
    ipAddress: req.ip,
  });

  const token = signToken(admin);
  return ok(res, { token, admin: publicAdmin(admin) }, 201);
});

const login = asyncHandler(async (req, res) => {
  const missing = requireFields(req.body, ['email', 'password']);
  if (missing.length) {
    return fail(res, `Faltan campos: ${missing.join(', ')}`);
  }

  const { email, password } = req.body;
  const admin = await adminService.findByEmail(email);

  if (!admin) {
    return fail(res, 'Credenciales incorrectas', 401);
  }

  const valid = await verifyPassword(password, admin.password_hash);
  if (!valid) {
    return fail(res, 'Credenciales incorrectas', 401);
  }

  if (!admin.is_active) {
    return fail(res, 'La cuenta está desactivada', 403);
  }

  const updated = await adminService.updateAdmin(admin.id, {
    lastLoginAt: new Date().toISOString(),
  });

  await auditService.logAction({
    adminId: admin.id,
    action: 'login',
    entity: 'admins',
    entityId: admin.id,
    ipAddress: req.ip,
  });

  const token = signToken(updated);
  return ok(res, { token, admin: publicAdmin(updated) });
});

const me = asyncHandler(async (req, res) => {
  return ok(res, { admin: req.admin });
});

const changePassword = asyncHandler(async (req, res) => {
  const missing = requireFields(req.body, ['currentPassword', 'newPassword']);
  if (missing.length) {
    return fail(res, `Faltan campos: ${missing.join(', ')}`);
  }

  const { currentPassword, newPassword } = req.body;
  if (!isStrongPassword(newPassword)) {
    return fail(res, 'La nueva contraseña debe tener al menos 8 caracteres');
  }

  const valid = await verifyPassword(currentPassword, req.adminRecord.password_hash);
  if (!valid) {
    return fail(res, 'La contraseña actual no es correcta', 401);
  }

  const passwordHash = await hashPassword(newPassword);
  await adminService.updateAdmin(req.admin.id, { passwordHash });

  await auditService.logAction({
    adminId: req.admin.id,
    action: 'change_password',
    entity: 'admins',
    entityId: req.admin.id,
    ipAddress: req.ip,
  });

  return ok(res, { message: 'Contraseña actualizada' });
});

module.exports = { bootstrap, login, me, changePassword };
