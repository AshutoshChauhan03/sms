// env import
require("dotenv").config();
// mongoose ODM
const mongoose = require("mongoose");

// mongoose Connector
mongoose
  .connect(process.env.DB, {
    serverSelectionTimeoutMS: 5000,
    useNewUrlParser: true,
  })
  // success
  .then(() => {
    console.log("<<<        MongoDB Database Connected       >>>");
  })
  // failed
  .catch(() => {
    console.log("<<<       MongoDB Connection Failed       >>>");
  });

// export connection
module.exports = mongoose.connection;
