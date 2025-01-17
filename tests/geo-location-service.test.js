const GeoLocationService = require("../app/services/geo-location-service");
require("dotenv").config({
  path: ".env.test.local",
});

describe("Geo Location Service - Get location by ip address", () => {
  // Testcase 1 : Invalid IP Address
  it("It should throws an error", async () => {
    await expect(
      GeoLocationService.getLocationByIPAddress("12222")
    ).rejects.toThrow("valid IP address");
  });

  // Testcase 2 : Invalid IP Address
  it("It should throws an error", async () => {
    await expect(
      GeoLocationService.getLocationByIPAddress("122.22.22.111.222")
    ).rejects.toThrow("valid IP address");
  });

  // Testcase 3 : Valid Address
  it("It should fetch location data for a valid IP", async () => {
    const data = await GeoLocationService.getLocationByIPAddress(
      "122.22.22.111"
    );

    await expect(data);
  });

  // Testcase 4 : Valid Address
  it("It should fetch location data based on client's ip address (No ip address is given)", async () => {
    const data = await GeoLocationService.getLocationByIPAddress();
    await expect(data);
  });

  // Testcase 5 : Invalid API Key
  it("It should throws an error: invalid api key", async () => {
    process.env.IP_INFO_API_ACCESS_TOKEN = "invalid api key1111111111";
    await expect(
      GeoLocationService.getLocationByIPAddress("122.22.22.111")
    ).rejects.toThrow("Invalid token");
  });
});
