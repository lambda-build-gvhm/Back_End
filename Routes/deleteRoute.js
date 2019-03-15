const updateRoute = require("express").Router();
const db = require("../data/dbConfig");
const bcrypt = require("bcrypt");

updateRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db("users")
      .where({ id: id })
      .del();

    res.status(200).json({ message: "delete success" });
  } catch (rejection) {
    res.status(500).json({ rejection });
  }
});

updateRoute.get("/users", async (req, res) => {
  const users = await db("users");
  res.status(200).json({ users });
});

module.exports = updateRoute;
