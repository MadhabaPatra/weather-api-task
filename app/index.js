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

// Health check
app.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "UP", uptime: process.uptime(), timestamp: Date.now() });
});

// Weather api routes
app.use("/", apiRateLimiter, require("./weather/routes"));

module.exports = app;
