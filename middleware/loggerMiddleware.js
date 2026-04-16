const morgan = require("morgan");
const logger = require("../utils/logger");

// stream setup
const stream = {
  write: (message) => logger.info(message.trim()),
};

// middleware
const morganMiddleware = morgan(
  ":method :url :status :response-time ms",
  { stream }
);

module.exports = morganMiddleware;