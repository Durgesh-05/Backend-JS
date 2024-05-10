const express = require("express");
const { logReqRes } = require("./middelwares");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

module.exports = { app };
