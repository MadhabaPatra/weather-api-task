// This is the controller.js file
// --> It's single job is to get any relevant data from the 'req' object
// and dispatch it to the relevent services.
// The returned value should be ready to be sent in a response using 'res'

// Services
const GeoLocationService = require("../services/geo-location-service");
const WeatherService = require("../services/weather-service");

// Utills
const sanitizeString = require("../utils/sanitize-string");
const isValidIp = require("../utils/is-valid-ip");
const logger = require("../utils/logger");

const Weather = {
  /**
   * Handle retrieving weather data by IP address.
   * @async
   * @function GetByIPAddress
   * @param {HTTPRequestObject} req - Incoming HTTP request object.
   * @param {HTTPResponseObject} res - HTTP response object.
   * @returns {Promise<void>} Sends a JSON response with weather data or an error message.
   */
  GetByIPAddress: async function (req, res) {
    let { ip } = req.query;

    try {
      // Sanitize the IP address
      ip = sanitizeString(ip);

      if (ip) {
        if (!isValidIp(ip)) {
          logger.warn("Invalid IP address format", { ip: ip });
          return res.status(400).json({
            message: "Invalid IP address",
          });
        }
      }

      // Call API to get the location
      const ipData = await GeoLocationService.getLocationByIPAddress(ip);

      const data = {
        ip: ipData["ip"],
        location: {
          city: ipData["city"],
          country: ipData["country"],
        },
      };

      logger.info("Location data fetched successfully", {
        ...data,
        ip: undefined,
        ipHash: Buffer.from(data["ip"]).toString("base64").slice(0, 8),
      });

      const { main, weather } = await WeatherService.getWeatherByCity(
        ipData["city"]
      );

      data["weather"] = {
        temperature: main["temp"],
        humidity: main["humidity"],
        description: weather[0]["description"],
      };

      logger.info("Weather fetched successfully", {
        ...data,
        ip: undefined,
        ipHash:
          data["ip"] && Buffer.from(data["ip"]).toString("base64").slice(0, 8),
      });

      return res.status(200).json(data);
    } catch (e) {
      // Handle axios errors : To Handle external service api calls
      if (e.name === "AxiosError") {
        return res.status(400).json({
          message: "Service is not available, Please try after some time.",
        });
      }
      // Handle axios errors : To Handle general errors
      else {
        logger.error("Error fetching weather: Reason: General Error", {
          message: e?.message,
          ipHash: ip && Buffer.from(ip).toString("base64").slice(0, 8),
        });
        return res.status(400).json(e);
      }
    }
  },
};

module.exports = Weather;
