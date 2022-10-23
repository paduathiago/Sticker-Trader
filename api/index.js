// Dotenv
require("dotenv").config();

//Database sync
require("./database/sync");

//APP
const app = require("./config/express-config");

app.listen(
  process.env.APP_PORT,
  console.log(`API listening on port ${process.env.APP_PORT}`)
);
