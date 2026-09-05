const { Router } = require('express');
const auditController = require('../controllers/auditController');
const { requireAuth, requireRoles } = require('../middleware/auth');

const router = Router();

router.get('/', requireAuth, requireRoles('superadmin', 'admin'), auditController.list);

module.exports = router;
