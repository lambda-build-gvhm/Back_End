require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dataRoute = require("./dataRoute");
const registerRoute = require("./registerRoute");
const loginRoute = require("./loginRoute");
const helmet = require("helmet");
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

const private = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodeToken) => {
      if (err) {
        res.status(400).json({ message: "No token found" });
      } else {
        req.decodeToken = decodeToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "You are not authenticated" });
  }
};
server.use("/api/register", registerRoute);
server.use("/api/login", loginRoute);
server.use("/api/dataPage", private, dataRoute);

module.exports = server;
