const db = require("./dbConfig");
const loginRoute = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = user => {
  payload = {
    username: user.username
  };

  secret = process.env.SECRET;

  options = {
    expiresIn: "10m"
  };

  return jwt.sign(payload, secret, options);
};

loginRoute.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db
      .select()
      .from("users")
      .where({ username: username })
      .first();

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = createToken(user);
      res.status(200).json({ jwt: token });
    } else {
      res.status(401).json({ message: "username/password combo is incorrect" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = loginRoute;
