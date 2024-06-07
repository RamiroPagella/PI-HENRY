"use strict";

const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const server = express();
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  next();
});
server.use(router);
module.exports = server;