require('dotenv').config();

const required = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'JWT_SECRET',
];

const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  throw new Error(`Faltan variables de entorno: ${missing.join(', ')}`);
}

module.exports = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
};
