//Installing dependencies
const express = require("express");
const cors = require("cors");

// Transforming express into a variable
const app = express();
const port = process.env.PORT || 8008;

// Import routes
const userRoute = require("./routes/userRoute");
const insuranceRoute = require("./routes/insuranceRoute");
const claimsRoute = require("./routes/claimsRoute");
const residentialRoute = require("./routes/residentialRoute");
const corporateRoute = require("./routes/corporateRoute");
const realEstateRoute = require("./routes/realEstateRoute");
const clientRoute = require("./routes/clientRoute");
const emailingRoutes = require("./routes/emailingRoute");

// Setting the API Port
// app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(cors());

// "Home page" of the api
app.get("/", (req, res) => {
  res.json({ msg: "Lets hope render will be better" });
});

// Listening for the api port
app.listen(port, (req, res) => {
  // app.get("port", (req, res) => {
  console.log("Connection to server has been established");
  // console.log(`Port available at localhost:${app.get("port")}`);
  console.log(`Port available at localhost:${port}`);
  console.log("Press Ctrl + C to close localhost.");
});
// );

// Using the routes

// For those loggin in/registering
app.use("/user", userRoute);

// For the basic client details
app.use("/clients", clientRoute);

// For insurance clients
app.use("/insurance", insuranceRoute);
app.use("/claims", claimsRoute);

// For residential clients
app.use("/residential", residentialRoute);

// For corporate clients
app.use("/corporate", corporateRoute);

// For real estate clients
app.use("/realestate", realEstateRoute);

// For emailing
app.use("/email", emailingRoutes);

// export 'app'
// module.exports = app;
