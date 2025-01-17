// This is the entry file of the express server

// All the server configuration should be here
// We could also add additional network-related configuration in this file vhosts, SSL, etc.

// ENV file
require("dotenv").config();

const app = require("./app");

// Port 8080
const port = process.env.PORT || "8080";
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
