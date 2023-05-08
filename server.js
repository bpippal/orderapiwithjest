const express = require("express");
const app = express();

//Bootstrap - Load's initial setup
require("./bootstrap");

const createApplication = require("./application");
createApplication(app);

module.exports = app;