const express = require("express");
const router = express.Router();
const con = require("../library/db_connection");

//Get all clients
router.get("/", (req, res) => {
  try {
    let sql = "SELECT * FROM client";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Get one client
router.get("/:id", (req, res) => {
  try {
    let sql = `SELECT * FROM client WHERE clientID = ${req.params.id}`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

//Add a new client
router.post("/", (req, res) => {
  try {
    let sql = "INSERT INTO client SET ?";
    const {
      fullName,
      phoneNumber,
      emailAddress,
      streetAddress,
      area,
      insurer,
    } = req.body;

    let client = {
      fullName,
      phoneNumber,
      emailAddress,
      streetAddress,
      area,
      insurer,
    };

    con.query(sql, client, (err, result) => {
      if (err) throw err;
      res.json("Client has successfully been added.");
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
