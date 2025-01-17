const axios = require("axios");
const cacheStore = require("../utils/cache-store");
const logger = require("../utils/logger");
const WeatherService = {
  /**
   * Handle retrieving weather data by City.
   * @async
   * @function getWeatherByLocation
   * @param {string} city - The city.
   * @returns {Promise<object>} JSON response with weather data or throws an error message.
   * @see https://openweathermap.org/current#name
   */
  getWeatherByCity: async function (city) {
    try {
      logger.info("Incoming request to fetch weather data", {
        city: city,
      });

      // Get the weather data for the city is already cached
      const cachedResponse = cacheStore.get(city);

      if (cachedResponse) {
        logger.info("Returning cached weather data for city:", city);
        return cachedResponse;
      }

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}`
      );

      if (response.data?.main && response.data?.weather) {
        // Store the weather data in the cache for future requests
        cacheStore.set(city, response.data);
      }

      return response.data;
    } catch (e) {
      logger.error("Axios Error [External api calls]", {
        service: "WeatherService",
        status: e?.response?.status,
        statusText: e?.response?.statusText,
        ...e.response?.data,
        city: city,
      });
      const error = new Error(
        e.response?.data?.message || e.response?.data?.data
      );
      error.name = "AxiosError";
      throw error;
    }
  },
};

module.exports = WeatherService;
