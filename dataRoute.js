const dataRoute = require("express").Router();
const db = require("./dbConfig");

dataRoute.get("/", async (req, res) => {
  res.status(200).json({ message: "Logged in to data route" });
});

module.exports = dataRoute;
