const express = require("express");
const router = express.Router();
const con = require("../library/db_connection");

//Get all claims related to client
router.get("/:id", (req, res) => {
  try {
    let sql = `SELECT * FROM insurance WHERE clientID = ${req.params.id}`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Get one claim related to client
router.get("/:first/:second", (req, res) => {
  try {
    let sql = `SELECT * FROM insurance WHERE clientID = ${req.params.first} AND WHERE claimID = ${req.params.second}`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Add new claim with existing client
router.post("/", (req, res) => {
  try {
    let sql = "INSERT INTO insurance SET ?";
    const { insurer, claimsNumber, damages, clientID } = req.body;
    let claim = {
      insurer,
      claimsNumber,
      damages,
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
    let sql = `UPDATE claims SET  siteAssDate=CURDATE() + INTERVAL 1 DAY WHERE claimID = ${req.params.id}`;
    // let sql = `UPDATE claims SET ? WHERE claimID = ${req.params.id}`;
    // const { siteAssDate } = req.body;
    // let claim = {
    //   siteAssDate,
    // };
    con.query(sql, (err, result) => {
      console.log(sql);
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
    let sql = `UPDATE claims SET  siteAssDate=CURDATE() + INTERVAL 1 DAY WHERE claimID = ${req.params.id}`;
    // let sql = `UPDATE claims SET ? WHERE claimID = ${req.params.id}`;
    // const { qteDarDate } = req.body;
    // const claim = { qteDarDate };
    con.query(sql, (err, result) => {
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
    let sql = `UPDATE claims SET  siteAssDate=CURDATE() + INTERVAL 1 DAY WHERE claimID = ${req.params.id}`;
    // let sql = `UPDATE claims SET ? WHERE claimID = ${req.params.id}`;
    // const { authDate } = req.body;
    // const claim = { authDate };
    con.query(sql, (err, result) => {
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
    let sql = `UPDATE claims SET  siteAssDate=CURDATE() + INTERVAL 1 DAY WHERE claimID = ${req.params.id}`;
    // let sql = `UPDATE claims SET ? WHERE claimID = ${req.params.id}`;
    // const { invDate } = req.body;
    // const claim = { invDate };
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.json("Updated claim");
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
module.exports = router;
