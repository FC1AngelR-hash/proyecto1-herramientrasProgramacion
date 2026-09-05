const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const env = require('./config/env');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const auditRoutes = require('./routes/audit.routes');
const { notFound, errorHandler } = require('./middleware/error');

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, data: { status: 'up', env: env.nodeEnv } });
});

app.use('/api/auth', authRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/audit-logs', auditRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`API de administración en http://localhost:${env.port}`);
});
