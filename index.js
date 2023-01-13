//Installing dependencies
const express = require("express");
const cors = require("cors");

// Transforming express into a variable
const app = express();

// Import routes
const userRoute = require("./routes/userRoute");

// Setting the API Port
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(cors());

// "Home page" of the api
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to your first ever app on Deta!" });
});

// Using the routes
app.use("/user", userRoute);

// Listening for the api port
app.listen(
  app.get("port", (req, res) => {
    console.log(`Port available at localhost:${app.get("port")}`);
    console.log("Press Ctrl + C to close localhost.");
  })
);

// export 'app'
// module.exports = app;
