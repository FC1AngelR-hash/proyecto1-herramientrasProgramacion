const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../config/env');

async function hashPassword(plain) {
  return bcrypt.hash(plain, env.bcryptSaltRounds);
}

async function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

function signToken(admin) {
  return jwt.sign(
    {
      sub: admin.id,
      email: admin.email,
      role: admin.role,
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
}

function verifyToken(token) {
  return jwt.verify(token, env.jwtSecret);
}

function isStrongPassword(password) {
  return typeof password === 'string' && password.length >= 8;
}

module.exports = {
  hashPassword,
  verifyPassword,
  signToken,
  verifyToken,
  isStrongPassword,
};
