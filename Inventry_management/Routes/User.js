const express = require("express");
const router = express.Router();
const db = require("./Db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


router.get("/view", (req, res) => {
  res.send("register");
});

router.post("/register", (req, res) => {
  // console.log(req.body)
  const { username, mail, password } = req.body;
  db.execute(
    "Insert into users (name,mail,password) values (?,?,?)",
    [username, mail, password],
    (err, result) => {
      if (err) {
        console.log("Error in Registering User", err);
      } else {
        result.send("User Registered");
        console.log("Registered Successfull");
      }
    }
  );
});

router.post("/login", async (req, res) => {
  const { mail, password } = req.body;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE mail = ? AND password = ?",
      [mail, password]
    );

    if (rows.length > 0) {
      const user = rows[0]; 
      const name = user["Name"];
        const userId = user["User_id"];
        // console.log(userId+name)

      const token = jwt.sign(
        { mail: mail, name: name, id: userId },
        process.env.ACCESS_TOKEN,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token: token });
      console.log("Login success");
    } else {
      console.log("Invalid Credential");
      res.status(401).json({ message: "Invalid Credential" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




module.exports = router;
