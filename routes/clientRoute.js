const express = require("express");
const router = express.Router();
const con = require("../library/db_connection");
const nodemailer = require("nodemailer");

//Get all clients
router.get("/client/:id", (req, res) => {
  try {
    let sql = `SELECT * FROM client WHERE userID = ${req.params.id}`;
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
router.get("/client/:id/:id", (req, res) => {
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
      userID,
      userName,
    } = req.body;

    let client = {
      fullName,
      phoneNumber,
      emailAddress,
      streetAddress,
      area,
      insurer,
      userID,
    };

    let user = {
      userName,
    };

    con.query(sql, client, (err, result) => {
      if (err) throw err;
      res.json("Client has successfully been added.");
    });

    const transporter = nodemailer.createTransport({
      service: "gmail", //Stating the mailing service we will be using
      auth: {
        user: process.env.MAILER_USER, //Accessing the account in dotenv
        pass: process.env.MAILER_PASS, //Accessing the password in dotenv
      },
    });

    const mailData = {
      from: process.env.MAILER_USER,
      to: process.env.MAILER_USER,
      subject: "New Client Added",
      html: `  <div>
    <p>The client ${client.fullName} has been added by ${user.userName}</p>
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
