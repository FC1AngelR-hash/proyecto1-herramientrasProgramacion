const { fail } = require('../utils/http');
const { verifyToken } = require('../services/authService');
const adminService = require('../services/adminService');
const { publicAdmin } = require('../utils/serializers');

function extractToken(req) {
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) {
    return header.slice(7).trim();
  }
  return null;
}

async function requireAuth(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token) {
      return fail(res, 'Token requerido', 401);
    }

    const payload = verifyToken(token);
    const admin = await adminService.findById(payload.sub);

    if (!admin || !admin.is_active) {
      return fail(res, 'Sesión inválida o cuenta desactivada', 401);
    }

    req.admin = publicAdmin(admin);
    req.adminRecord = admin;
    next();
  } catch (error) {
    return fail(res, 'Token inválido o expirado', 401);
  }
}

function requireRoles(...roles) {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      return fail(res, 'No tienes permisos para esta acción', 403);
    }
    next();
  };
}

module.exports = { requireAuth, requireRoles };
