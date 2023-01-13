const express = require("express");
const router = express.Router();
const con = require("../library/db_connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get all users
router.get("/", (req, res) => {
  try {
    let sql = "SELECT * FROM users";
    con.query(sql, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// Register a user
router.post("/register", (req, res) => {
  try {
    let sql = "INSERT INTO users SET ?";
    const {
      fullname,
      phoneNumber,
      email,
      password,
      // role,
    } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    let user = {
      fullname,
      phoneNumber,
      email,
      password: hash,
    };

    con.query(sql, user, (err, result) => {
      if (err) throw err;
      res.json(`User ${user.fullname} has been created.`);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Login a user
router.post("/login", (req, res) => {
  try {
    let sql = "SELECT * FROM users WHERE ?";
    let user = {
      email: req.body.email,
    };
    con.query(sql, user, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.json({ error: "User with this email address does not exist" });
      } else {
        const isMatch = await bcrypt.compare(
          req.body.password,
          result[0].password
        );
        if (!isMatch) {
          res.json({ error: "Incorrect password." });
        } else {
          const payload = {
            user: {
              userID: result[0].userID,
              fullname: result[0].fullname,
              phoneNumber: result[0].phoneNumber,
              email: result[0].email,
              role: result[0].role,
            },
          };
          jwt.sign(payload, process.env.jwtSecret, (err, token) => {
            if (err) throw err;
            res.json({ token });
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Verifies token
router.get("/verify", (req, res) => {
  const token = req.header("x-auth-token");
  jwt.verify(token, process.env.jwtSecret, (error, decodedToken) => {
    if (error) {
      res.status(401).json({
        msg: "Unauthorized access!",
      });
    } else {
      res.status(200);
      res.send(decodedToken);
    }
  });
});

module.exports = router;
