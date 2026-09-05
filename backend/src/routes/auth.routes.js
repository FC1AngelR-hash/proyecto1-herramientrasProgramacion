const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Demasiados intentos. Intenta más tarde.' },
});

router.post('/bootstrap', authLimiter, authController.bootstrap);
router.post('/login', authLimiter, authController.login);
router.get('/me', requireAuth, authController.me);
router.patch('/password', requireAuth, authController.changePassword);

module.exports = router;
