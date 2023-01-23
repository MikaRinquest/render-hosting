const express = require("express");
const router = express.Router();
const fs = require("fs");
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");

// Send DAR info
router.post("/", (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", //Stating the mailing service we will be using
      auth: {
        user: process.env.MAILER_USER, //Accessing the account in dotenv
        pass: process.env.MAILER_PASS, //Accessing the password in dotenv
      },
    });

    const {
      damage,
      facility,
      severity,
      category,
      method,
      recommendation,
      internalLocations,
      externalLocations,
      concealed,
      notConcealed,
      remarks,
    } = req.body;

    const dar = {
      damage,
      facility,
      severity,
      category,
      method,
      recommendation,
      internalLocations,
      externalLocations,
      concealed,
      notConcealed,
      remarks,
    };

    const mailData = {
      from: process.env.MAILER_USER,
      to: "rinquestmika@gmail.com",
      subject: "Sending DAR information",
      text: `  <div>
      <p>Damage Type:{{dar.damage}}</p>
      <p>Facility:{{dar.facility}}</p>
      <p>Leak/Damage Severity:{{dar.severity}{}}</p>
      <p>Inspection Category:{{dar.category}}</p>
      <p>Leak Detection Method:{{dar.method}}</p>
      <p>Repair Action Recommended:{{dar.recommendation}}</p>
      <p>Internal Leak/Damage Location:{{dar.internalLocations}}</p>
      <p>External Leak/Damage Location:{{dar.externalLocations}}</p>
      <p>Concealed Leak/Damage Status:{{dar.concealed}}</p>
      <p>Not Concealed Leak/Damage Status:{{dar.notConcealed}}</p>
      <p>Remarks:{dar.remarks}</p>
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

module.exports = router;
