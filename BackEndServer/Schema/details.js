const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  collegeId: {
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
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
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
  rollNo: {
    type: String,
    required: true,
  },
  enrollRollNo: {
    type: String,
    required: true,
  },
  universityRollNo: {
    type: String,
    required: true,
  },
  highSchoolPercentage: {
    type: String,
    required: true,
  },
  intermediatePercentage: {
    type: String,
    required: true,
  },
  enrollmentDate: {
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
