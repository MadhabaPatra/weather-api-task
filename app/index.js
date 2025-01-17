/* This is the entry file of the app
   All the application configuration should be defined here
   Like Routes, Middleware, Third party utilities etc.
*/

const express = require("express");
const apiRateLimiter = require("./middlewares/apiRateLimiter");
const requestIp = require("request-ip");
const helmet = require("helmet");

// Initiate express app

const app = express();

// Middlewares

app.use(helmet()); // Enable default security headers
app.use(apiRateLimiter); // Rate limit : 5 Requests per minute

// Routes
app.use("/", require("./weather/routes"));
app.get("/health", (req, res) => {
  return res.send("ok");
});

module.exports = app;
