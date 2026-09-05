const { ok, asyncHandler } = require('../utils/http');
const auditService = require('../services/auditService');

const list = asyncHandler(async (req, res) => {
  const logs = await auditService.listLogs({ limit: req.query.limit });
  return ok(res, { logs });
});

module.exports = { list };
