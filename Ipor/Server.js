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
    password TEXT,
    profile_image TEXT DEFAULT 'https://cdn.marvel.com/content/1x/349red_com_crd_01.png'
)`);

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  const defaultProfileImage =
    "https://cdn.marvel.com/content/1x/349red_com_crd_01.png"; //  ค่าเริ่มต้น

  console.log("POST:", username, email, password);

  db.run(
    `INSERT INTO users (username, email, password, profile_image) VALUES (?, ?, ?, ?)`,
    [username, email, encryptedPassword, defaultProfileImage],
    function (err) {
      if (err) return res.status(400).send({ message: "User already exists" });

      res.send({
        message: "User registered",
        profileImage: defaultProfileImage,
      });
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
      res.send({
        token,
        profileImage: user.profile_image, //  ส่ง URL รูปภาพกลับไปด้วย
      });
    }
  );
});


app.put("/update-profile-image", (req, res) => {
  const { username, profileImage } = req.body;

  db.run(
    `UPDATE users SET profile_image = ? WHERE username = ?`,
    [profileImage, username],
    function (err) {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .send({ message: "Error updating profile image" });
      }
      res.send({ message: "Profile image updated successfully", profileImage });
    }
  );
});


app.get("/get-user", (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      username: user.username,
      email: user.email,
      profileImage: user.profile_image, //  ส่ง URL รูปภาพกลับไป
    });
  });
});


app.listen(5000, () => console.log("Server running on port 5000"));
