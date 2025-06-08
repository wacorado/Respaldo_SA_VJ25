// src/middlewares/metrics.js
const client = require('prom-client');

// Crea un registro global
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const metricsMiddleware = (req, res, next) => {
  // Puedes agregar métricas personalizadas aquí si quieres
  next();
};

const metricsEndpoint = async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    res.status(500).end(err.message);
  }
};

module.exports = { metricsMiddleware, metricsEndpoint };
