require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const updateRoute = require("./updateRoute");
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
        res.status(400).json({ message: "No token found", err });
      } else {
        req.decodeToken = decodeToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "You are not authenticated" });
  }
};

const staticPath = __dirname + "/StaticFiles";

server.use("/html", [
  function(request, response, next) {
    response.set(
      "X-Frame-Options",
      "allow-from https://gvheatmap.herokuapp.com/"
    );
    next();
  },
  express.static(staticPath)
]);
// server.use("/html", express.static(staticPath));

server.use("/api/register", registerRoute);
server.use("/api/login", loginRoute);
server.use("/api/update", private, updateRoute);

module.exports = server;
