const express = require("express");
const router = express.Router();
const con = require("../library/db_connection");

//Get claims with client inner join
router.get("/insurance", (req, res) => {
  try {
    let sql =
      "SELECT * FROM claims INNER JOIN client on claims.clientID = client.clientID";
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
router.get("/insurance/:id", (req, res) => {
  try {
    let sql = `SELECT * FROM claims INNER JOIN client on claims.clientID = client.clientID WHERE claimID = ${req.params.id}`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
// Get all claims
router.get("/", (req, res) => {
  try {
    let sql = "SELECT * FROM claims";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Get one claim
router.get("/:id", (req, res) => {
  try {
    let sql = `SELECT * FROM claims WHERE claimID = ${req.params.id}`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Add new claim
router.post("/", (req, res) => {
  try {
    let sql = "INSERT INTO claims SET ?";
    const {
      claimsNumber,
      damages,
      siteAssDate,
      qteDarDate,
      authDate,
      invDate,
      dar,
      clientID,
    } = req.body;

    let claim = {
      claimsNumber,
      damages,
      siteAssDate,
      qteDarDate,
      authDate,
      invDate,
      clientID,
    };

    con.query(sql, claim, (err, result) => {
      if (err) throw err;
      res.json(`Claim ${claim.claimsNumber} has been added`);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Edit site assessment
router.patch("/site/:id", (req, res) => {
  try {
    let sql = `INSERT INTO claims SET ? WHERE claimID = ${req.params.id}`;
    const { siteAssDate } = req.body;
    const claim = { siteAssDate };
    con.query(sql, claim, (err, result) => {
      if (err) throw err;
      res.json("Updated claim");
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Edit quote
router.patch("/quote/:id", (req, res) => {
  try {
    let sql = `INSERT INTO claims SET ? WHERE claimID = ${req.params.id}`;
    const { qteDarDate } = req.body;
    const claim = { qteDarDate };
    con.query(sql, claim, (err, result) => {
      if (err) throw err;
      res.json("Updated claim");
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Edit auth
router.patch("/auth/:id", (req, res) => {
  try {
    let sql = `INSERT INTO claims SET ? WHERE claimID = ${req.params.id}`;
    const { authDate } = req.body;
    const claim = { authDate };
    con.query(sql, claim, (err, result) => {
      if (err) throw err;
      res.json("Updated claim");
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Edit inv
router.patch("/inv/:id", (req, res) => {
  try {
    let sql = `INSERT INTO claims SET ? WHERE claimID = ${req.params.id}`;
    const { invDate } = req.body;
    const claim = { invDate };
    con.query(sql, claim, (err, result) => {
      if (err) throw err;
      res.json("Updated claim");
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
module.exports = router;
