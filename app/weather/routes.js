const express = require("express");
const router = express.Router();

const Weather = require("./controller");

/**
 * Retrieves weather information based on the provided or detected IP address.
 * @param {string} [ip] - The IP address to fetch the weather for. If not provided, the server will use the IP from the request.
 */
router.get("/weather-by-ip", Weather.GetByIPAddress);

module.exports = router;
