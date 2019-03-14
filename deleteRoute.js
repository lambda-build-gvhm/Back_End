const updateRoute = require("express").Router();
const db = require("./dbConfig");
const bcrypt = require("bcrypt");

// updateRoute.put("/:id", async (req, res) => {
//   const userChange = req.body;
//   if (userChange.password) {
//     const hash = bcrypt.hashSync(userChange.password, 14);
//     userChange.password = hash;
//   }
//   const { id } = req.params;
//   const updated = await db("users")
//     .update(userChange)
//     .where({ id: id });

//   res.status(200).json({ username: userChange.username }); //Clear old username from localStorage onSubmit and set new username.
// });

updateRoute.delete("/delete/:id", async (req, res) => {
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

//changes made to server.js, updateRoute.js and login.js(pass id with token and username to identify user to change) for update method.
