const { Router } = require('express');
const adminController = require('../controllers/adminController');
const { requireAuth, requireRoles } = require('../middleware/auth');

const router = Router();

router.use(requireAuth);

router.get('/', requireRoles('superadmin', 'admin'), adminController.list);
router.get('/:id', requireRoles('superadmin', 'admin'), adminController.getById);
router.post('/', requireRoles('superadmin', 'admin'), adminController.create);
router.patch('/:id', requireRoles('superadmin', 'admin'), adminController.update);
router.delete('/:id', requireRoles('superadmin'), adminController.remove);

module.exports = router;
