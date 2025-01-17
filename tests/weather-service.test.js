const WeatherService = require("../app/services/weather-service");
require("dotenv").config({
  path: ".env.test.local",
});

describe("Weather Service - Get weather by city", () => {
  // Testcase 1 : Empty city
  it("It should throws an error", async () => {
    await expect(WeatherService.getWeatherByCity("")).rejects.toThrow(
      "Nothing to geocode"
    );
  });

  // Testcase 2 : Invalid city name
  it("It should throws an error", async () => {
    await expect(
      WeatherService.getWeatherByCity("helloajajjaja")
    ).rejects.toThrow("city not found");
  });

  // Testcase 3 : Valid city
  it("It should fetch weather data for a valid city", async () => {
    const data = await WeatherService.getWeatherByCity("Hyderabad");

    await expect(data);
  });
});
