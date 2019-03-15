const registerRoute = require("express").Router();
const db = require("../data/dbConfig");
const bcrypt = require("bcrypt");

registerRoute.post("/", async (req, res) => {
  const newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 14);
  newUser.password = hash;

  const registered = await db("users").insert(newUser);
  res.status(201).json({ message: "registered" });
});

module.exports = registerRoute;
