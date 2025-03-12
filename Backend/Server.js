const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const db = new sqlite3.Database("./users.db", (err) => {
  if (err) console.error(err.message);
  console.log("Connected to SQLite DB");
});

db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT
    )`);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  console.log("POST:", username, password);

  db.run(
    `INSERT INTO users (username, password)VALUES (?, ?)`,
    [username, encryptedPassword],
    function (err) {
      if (err) return res.status(400).send({ message: "User already exists" });
      res.send({ message: "User registered" });
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get(
    `SELECT * FROM users WHERE username = ?`,
    [username],
    async (err, user) => {
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send({ message: "Invalid" });
      }
      const token = jwt.sign({ userID: user.id }, "secretkey");
      res.send({ token });
    }
  );
});

app.listen(5000, () => console.log("Server running on port 5000"));
