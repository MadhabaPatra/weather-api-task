const request = require("supertest"); // For making HTTP requests
const app = require("../app"); // Your Express app instance
const axios = require("axios");

require("dotenv").config({
  path: ".env.test.local",
});

describe("Weather API Route [GET] /weather-by-ip", () => {
  //   Testcase 1
  it("should throw an error", async () => {
    // Make a request to your API endpoint with an invalid IP
    const response = await request(app).get("/weather-by-ip?ip=invalid-ip");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Invalid IP address",
    });
  });

  // Testcase 2
  it("should return a json response", async () => {
    // Make a request to your API endpoint with an invalid IP
    const response = await request(app).get("/weather-by-ip?ip=122.22.222.222");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      ip: expect.any(String),
      location: {
        city: expect.any(String),
        country: expect.any(String),
      },
      weather: {
        temperature: expect.any(Number),
        humidity: expect.any(Number),
        description: expect.any(String),
      },
    });
  });

  // Testcase 3 : without ip address
  it("should return a json response", async () => {
    // Make a request to your API endpoint with an invalid IP
    const response = await request(app).get("/weather-by-ip");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      ip: expect.any(String),
      location: {
        city: expect.any(String),
        country: expect.any(String),
      },
      weather: {
        temperature: expect.any(Number),
        humidity: expect.any(Number),
        description: expect.any(String),
      },
    });
  });

  // Testcase 5: Rate limit
  it("should return 429", async () => {
    const ip = "123.123.123.123"; // Example IP

    // Simulate multiple requests to trigger rate limit
    for (let i = 0; i < 5; i++) {
      await request(app).get(`/weather-by-ip?ip=${ip}`);
    }

    // Make one more request to exceed the rate limit
    const response = await request(app).get(`/weather-by-ip?ip=${ip}`);

    // Expect a 429 status code
    expect(response.status).toBe(429);
  });

  // Testcase 5: Invalid service api keys
  it("should return a json response", async () => {
    // process.env.IP_INFO_API_ACCESS_TOKEN = "ddddd";
    process.env.OPEN_WEATHER_API_KEY = "ddddd";
    // Make a request to your API endpoint with an invalid IP
    const response = await request(app).get("/weather-by-ip?ip=43.192.155.196");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Service is not available, Please try after some time.",
    });
  });
});
