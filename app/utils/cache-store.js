const NodeCache = require("node-cache");

// In-memory cache instance with a default TTL (Time to Live) of 10 minutes (600 seconds)
const cacheStore = new NodeCache({ stdTTL: 600, checkperiod: 120 });

module.exports = cacheStore;
