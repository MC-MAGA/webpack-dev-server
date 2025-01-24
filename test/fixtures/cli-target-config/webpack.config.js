"use strict";

const { resolve } = require("path");

module.exports = {
  mode: "development",
  stats: "detailed",
  entry: resolve(__dirname, "./foo.js"),
  target: ["web"],
};
