const isValidIp = require("../app/utils/is-valid-ip");
require("dotenv").config({
  path: ".env.test.local",
});

describe("Valid Ip Address", () => {
  // Testcase 1 : Valid ip address
  it("It should validate ip address", () => {
    expect(isValidIp("122.22.22.111")).toBe(true);
  });

  // Testcase 2 : inValid ip address
  it("It should validate ip address", () => {
    expect(isValidIp("122.22.22")).toBe(false);
  });
});
