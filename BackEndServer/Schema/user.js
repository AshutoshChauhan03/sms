// import mongoose
const mongoose = require("mongoose");

// defining schema
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  adminStatus: {
    type: Boolean,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  otpStatus: {
    type: Boolean,
    required: true,
  },
});

// creating a mongoose model (like repository) Connecting collection to schema
const UserModel = new mongoose.model("Users", userSchema);

// export model
module.exports = UserModel;
