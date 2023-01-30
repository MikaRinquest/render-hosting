const express = require("express");
const router = express.Router();
const con = require("../library/db_connection");
const nodemailer = require("nodemailer");

//Get all clients
router.get("/", (req, res) => {
  try {
    let sql = `SELECT * FROM client `;
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

//Add a new client for insurance
router.post("/", (req, res) => {
  try {
    // let sql = "INSERT INTO client SET ?";
    const {
      fullName,
      phoneNumber,
      altNumber,
      emailAddress,
      streetAddress,
      area,
      industry,
      userID,
      userName,
      // insurer,
      // claimsNumber,
      // damages,
    } = req.body;

    const date = new Date().toISOString().slice(0, 10);

    let client = {
      fullName,
      phoneNumber,
      altNumber,
      emailAddress,
      streetAddress,
      area,
      industry,
      date,
      userID,
    };

    // let claimsql = "INSERT INTO claims SET ?";

    // let clientID = "SELECT @last_id := LAST_INSERT_ID( )";

    // let claim = {
    //   insurer,
    //   claimsNumber,
    //   damages,
    //   clientID,
    // };

    let user = {
      userName,
    };

    con.query(sql, client, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.json("Client has successfully been added.");
        // let id = result.insertId;
      }
    });

    // con.query(claimsql, claim, (e, r) => {
    //   if (e) throw e;
    //   res.json(r);
    // });

    const transporter = nodemailer.createTransport({
      service: "gmail", //Stating the mailing service we will be using
      auth: {
        user: process.env.MAILER_USER, //Accessing the account in dotenv
        pass: process.env.MAILER_PASS, //Accessing the password in dotenv
        //If using an actual gmail account, your real password won't work
        //You need to generate a key as your "password"
      },
    });

    const mailData = {
      from: process.env.MAILER_USER,
      to: process.env.MAILER_USER, //Can be from .env file, or hard coded, or from req.body
      subject: "New Client Added",
      html: `  <div>
    <p>${client.fullName} has been added by ${user.userName}</p>
    </div>`,
    };
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email valid", success);
      }
    });
    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        res.send("Please check your emails");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Delete client
router.delete("/:id", (req, res) => {
  try {
    let sql = `DELETE FROM client WHERE clientID = ${req.params.id}`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.json("Client has successfully been added.");
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
module.exports = router;
