const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
  student_Name: {
    type: String,
    required: true,
  },
  student_Id: {
    type: String,
    required: true,
  },
  college_Id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  father_Name: {
    type: String,
    required: true,
  },
  mother_Name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  roll_No: {
    type: String,
    required: true,
  },
  enrollment_No: {
    type: String,
    required: true,
  },
  university_Roll_No: {
    type: String,
    required: true,
  },
  highSchool_Percentage: {
    type: String,
    required: true,
  },
  intermediate_Percentage: {
    type: String,
    required: true,
  },
  enrollment_Date: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const DetailsModel = new mongoose.model("Details", detailsSchema);

module.exports = DetailsModel;
