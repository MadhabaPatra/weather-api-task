const fs = require("node:fs");
const path = require("node:path");

const levels = {
  info: "INFO",
  warn: "WARN",
  error: "ERROR",
};

const logDir = path.resolve(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

/**
 * Logs a message with the specified level, timestamp, and structured details.
 * @param {string} level - Log level (info, warn, error).
 * @param {string} message - Log message.
 * @param {object} [meta] - Additional metadata for structured logging.
 * @see https://www.npmjs.com/package/winston
 */
function log(level, message, meta = {}) {
  const timestamp = new Date().toISOString();

  const metaString = Object.keys(meta).length ? JSON.stringify(meta) : "";

  const logMessage = `[${timestamp}] [${levels[level]}] ${message} \nmeta: ${metaString}`;

  if (!process.env.TESTING) {
    switch (level) {
      case "info":
        console.info(logMessage);
        break;
      case "warn":
        console.warn(logMessage);
        break;
      case "error":
        console.error(logMessage);
        break;
      default:
        console.log(logMessage);
    }
  }

  // In production, also write logs to a file
  if (process.env.NODE_ENV === "production" || process.env.DEBUG) {
    const today = new Date().toISOString().split("T")[0];
    const file = path.join(logDir, `app-${today}.log`);
    fs.appendFileSync(file, logMessage + "\n", "utf8");
  }
}

module.exports = {
  info: (message, meta) => log("info", message, meta),
  warn: (message, meta) => log("warn", message, meta),
  error: (message, meta) => log("error", message, meta),
};
