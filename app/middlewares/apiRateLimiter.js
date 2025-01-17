const { rateLimit } = require("express-rate-limit");

/**
 * Rate limit middleware
 * @see https://www.npmjs.com/package/express-rate-limit
 */

const apiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 5, // Limit each IP to 5 requests per `window` (here, per 1 minutes).
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

module.exports = apiRateLimiter;
