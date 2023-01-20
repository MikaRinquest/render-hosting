const express = require("express");
const router = express.Router();
const fs = require("fs");
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");

// Send DAR info
router.post("/", (req, res) => {
  try {
    const readHTMLFile = function (path, callback) {
      fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
        if (err) {
          callback(err);
        } else {
          callback(null, html);
        }
      });
    };

    const transporter = nodemailer.createTransport({
      service: "gmail", //Stating the mailing service we will be using
      auth: {
        user: process.env.MAILER_USER, //Accessing the account in dotenv
        pass: process.env.MAILER_PASS, //Accessing the password in dotenv
      },
    });

    readHTMLFile(
      __dirname + "/public/files/DAR_Template/emailDAR.html",
      function (err, html) {
        if (err) {
          console.log("error reading file", err);
          return;
        }
        const template = handlebars.compile(html);
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
        const htmlToSend = template(dar);

        const mailData = {
          from: process.env.MAILER_USER,
          to: "rinquestmika@gmail.com",
          subject: "Sending DAR information",
          text: htmlToSend,
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
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
