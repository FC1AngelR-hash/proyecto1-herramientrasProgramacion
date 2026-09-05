function notFound(req, res) {
  res.status(404).json({ ok: false, error: 'Ruta no encontrada' });
}

function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.code === '23505') {
    return res.status(409).json({ ok: false, error: 'El correo ya está registrado' });
  }

  if (err.message && /fetch failed|ENOTFOUND|JWT|Invalid API key|Could not find/i.test(err.message)) {
    return res.status(502).json({
      ok: false,
      error: 'No se pudo conectar con Supabase',
      details: err.message,
    });
  }

  if (err.code) {
    return res.status(502).json({
      ok: false,
      error: 'Error de base de datos',
      details: err.message,
      code: err.code,
    });
  }

  res.status(500).json({
    ok: false,
    error: 'Error interno del servidor',
  });
}

module.exports = { notFound, errorHandler };
