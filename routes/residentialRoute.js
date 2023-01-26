const express = require("express");
const router = express.Router();
const con = require("../library/db_connection");

//Get residential clients
router.get("/residential", (req, res) => {
  try {
    let sql =
      "SELECT * FROM residential INNER JOIN client on residential.clientID = client.clientID";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Get one residential client from inner join
router.get("/residential/:id", (req, res) => {
  try {
    let sql = `SELECT * FROM residential INNER JOIN client on residential.clientID = client.clientID WHERE claimID = ${req.params.id}`;
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
