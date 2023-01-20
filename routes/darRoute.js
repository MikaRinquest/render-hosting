const express = require("express");
const router = express.Router();
const con = require("../library/db_connection");

// Get DAR
router.get("/", (req, res) => {
  try {
    let sql = "SELECT * FROM dar";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Add DAR
router.post("/", (req, res) => {
  try {
    let = sql = "INSERT INTO dar SET ?";
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
      claimsID,
    } = req.body;
    const dar = {
      damage,
      facility,
      severity,
      category: [],
      method,
      recommendation,
      internalLocations: [],
      externalLocations: [],
      concealed: [],
      notConcealed: [],
      remarks,
      claimsID,
    };
    con.query(sql, dar, (err, result) => {
      if (err) throw err;
      const transporter = nodemailer.createTransport({
        service: "gmail", //Stating the mailing service we will be using
        auth: {
          user: process.env.MAILER_USER, //Accessing the account in dotenv
          psw: process.env.MAILER_PASS, //Accessing the password in dotenv
        },
      });
      const mailData = {
        from: process.env.MAILER_USER,
        to: "rinquestmika@gmail.com",
        subject: "Sending DAR information",
        text: `
        
          <div>
          <p>Damage Type:${result[0].damage}</p>
          <p>Facility:${result[0].facility}</p>
          <p>Leak/Damage Severity:${result[0].severity}</p>
          <p>Inspection Category:${result[0].category}</p>
          <p>Leak Detection Method:${result[0].method}</p>
          <p>Repair Action Recommended:${result[0].recommendation}</p>
          <p>Internal Leak/Damage Location:${result[0].internalLocations}</p>
          <p>External Leak/Damage Location:${result[0].externalLocations}</p>
          <p>Concealed Leak/Damage Status:${result[0].concealed}</p>
          <p>Not Concealed Leak/Damage Status:${result[0].notConcealed}</p>
          <p>Remarks:${result[0].remarks}</p>
          </div>
          `,
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
    });
  } catch (error) {
    console.log(error);
    req.status(400).json(error);
  }
});

module.exports = router;
