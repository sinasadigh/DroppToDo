const mongoose = require("mongoose");
const config = require("config");
module.exports = function () {
  mongoose
    .connect(config.get("dbURL"))
    .then(() => console.log("Connected to MongoDB..."));
};
