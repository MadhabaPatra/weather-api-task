const axios = require("axios");
const logger = require("../utils/logger");

const GeoLocationService = {
  /**
   * Handle retrieving weather data by IP address.
   * @async
   * @function getWeatherByIPAddress
   * @param {string} ip - Ip Address - Optional
   * @returns {Promise<object>} a JSON response with location data or throws an error message.
   * Documentation: To get the city information based on the provided ip address
   * @see https://ipinfo.io/developers/responses#free-plan
   * Documentation: If ip address is not specified
   * @see https://ipinfo.io/developers#jsonp-cors-requests
   */
  getLocationByIPAddress: async function (ip) {
    try {
      if (ip) {
        logger.info("Incoming request to fetch location data", {
          ipHash: Buffer.from(ip).toString("base64").slice(0, 8),
        });
      } else {
        logger.info(
          "Incoming request to fetch weather data based on client's request ip"
        );
      }

      let url = "https://ipinfo.io/json";
      if (ip) url = `https://ipinfo.io/${ip}/json`;

      const response = await axios.get(url, {
        params: {
          token: process.env.IP_INFO_API_ACCESS_TOKEN,
        },
      });

      return response?.data;
    } catch (e) {
      logger.error("Axios Error [External api calls]", {
        service: "GeoLocationService",
        status: e?.response?.status,
        statusText: e?.response?.statusText,
        ...e.response?.data,
        ipHash: ip && Buffer.from(ip).toString("base64").slice(0, 8),
      });
      const error = new Error(
        e.response?.data?.error?.message || e.response?.data?.data
      );
      error.name = "AxiosError";
      throw error;
    }
  },
};

module.exports = GeoLocationService;
