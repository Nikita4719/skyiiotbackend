const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    status: err.statusCode || 500,
    url: req.url,
    method: req.method,
  });

  res.status(err.statusCode || 500).json({
    error: err.message,
  });
};

module.exports = errorHandler;