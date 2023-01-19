const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const con = require("../library/db_connection");
const multer = require("multer"); //Allows us to use multer(middleware that allows us to handle files sent from the frontend (multipart/form-data))
const upload = multer({
  dest: "public/files",
});
//The above code sets a destination for where the file will be stored, it's not store in the database

router.post("/", upload.single("file"), (req, res) => {
  res.json;
});

// const { emailView, sendEmail } = require("../controllers/emailController");
// const { fileUpload } = require("../helper/fileHelper");

// router.get("/", emailView);

// router.post("sendEmail", fileUpload.array("files"), sendEmail);
// router.get("/", (req, res) => {
//   try {
//     let sql = "SELECT FROM insurers WHERE ?";
//     let insurer = {
//       insurerEmail: req.body.insurerEmail,
//     };
//     con.query(sql, insurer, (err, result) => {
//       if (err) throw err;
//       if (result === 0) {
//         res.status(400).json({ msg: "This email address does not exist" });
//       } else {
//         let transporter = nodemailer.createTransport({
//           service: "gmail",
//           host: process.env.MAILERHOST,
//           port: process.env.MAILERPASS,
//           auth: {
//             user: process.env.MAILERUSER,
//             pass: process.env.MAILERPASS,
//           },
//         });
//         const mailData = {
//           from: process.env.MAILERUSER,
//           to: result[0].email,
//           subject: "",
//           html: `<div>
//             <h3>Hi ${result[0].full_name},</h3>
//             <br>
//             <h4>Click link below to reset your password</h4>

//             <a href="https://user-images.githubusercontent.com/4998145/52377595-605e4400-2a33-11e9-80f1-c9f61b163c6a.png">
//               Click Here to Reset Password
//               user_id = ${result[0].user_id}
//             </a>

//             <br>
//             <p>For any queries feel free to contact us...</p>
//             <div>
//               Email: ${process.env.MAILERUSER}
//               <br>
//               Tel: If needed you can add this
//             <div>
//           </div>`,
//         };

//         transporter.verify((error, success) => {
//           if (error) {
//             console.log(error);
//           } else {
//             console.log("Email valid", success);
//           }
//         });
//         transporter.sendMail(mailData, (error, info) => {
//           if (error) {
//             console.log(error);
//           } else {
//             res.json("Please check your emails", result[0].user_id);
//           }
//         });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     req.status(400).json(error);
//   }
// });

router.post("/");

module.exports = router;
