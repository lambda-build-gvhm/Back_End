require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const deleteRoute = require("../Routes/deleteRoute");
const registerRoute = require("../Routes/registerRoute");
const loginRoute = require("../Routes/loginRoute");
const updateRoute = require("../Routes/updateRoute");
const helmet = require("helmet");
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

const privateRoute = (req, res, next) => {
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
server.use("/api/update", updateRoute);
server.use("/api/delete", privateRoute, deleteRoute);

module.exports = server;
