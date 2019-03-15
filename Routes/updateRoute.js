const updateRoute = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../data/dbConfig");

updateRoute.put("/:id", async (req, res) => {
  const userChange = req.body;
  if (userChange.password) {
    const hash = bcrypt.hashSync(userChange.password, 14);
    userChange.password = hash;
  }
  const { id } = req.params;
  const updated = await db("users")
    .update(userChange)
    .where({ id: id });

  res.status(200).json({ username: userChange.username }); //Clear old username from localStorage onSubmit and set new username.
});

module.exports = updateRoute;
