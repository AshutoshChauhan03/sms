// Config of env variables
require("dotenv").config();

// importing libraries
const express = require("express");
const cors = require("cors");

// routers
const authRouter = require("./Routers/auth");
const studentRouter = require("./Routers/student");

// express app & configs
const app = express();
app.use(cors());

// default homepage
app.get("/", (req, res) => {
  return res.send("<<<--------EXPRESS SERVER UP-------->>>");
});

// All auth routes
app.use("/auth", authRouter);

// All student routes
app.use("/students", studentRouter);

// express app listen
app.listen(process.env.PORT, () => {
  console.log("<<<--------EXPRESS SERVER UP-------->>>");
});
