const express = require("express");
const router = express.Router();
const con = require("../library/db_connection");

//Get claims with client inner join
router.get("/corporate", (req, res) => {
  try {
    let sql =
      "SELECT * FROM corporate INNER JOIN client on corporate.clientID = client.clientID";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Get one claim from inner join
router.get("/corporate/:id", (req, res) => {
  try {
    let sql = `SELECT * FROM corporate INNER JOIN client on corporate.clientID = client.clientID WHERE claimID = ${req.params.id}`;
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
