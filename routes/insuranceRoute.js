const express = require("express");
const router = express.Router();
const con = require("../library/db_connection");

//Get insurance clients details
router.get("/", (req, res) => {
  try {
    let sql =
      "SELECT * FROM insurance INNER JOIN client on insurance.clientID = client.clientID";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Get one insurance client from inner join
router.get("/:id", (req, res) => {
  try {
    let sql = `SELECT * FROM insurance INNER JOIN client on insurance.clientID = client.clientID WHERE claimID = ${req.params.id}`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
module.exports = router;
