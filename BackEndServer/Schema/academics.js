const mongoose = require("mongoose");

const academicsSchema = new mongoose.Schema({
  student_Id: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  subject: {
    type: [String],
    required: true,
  },
  days_attended: {
    type: [{}],
    required: true,
  },
  marks_obtained: {
    type: [{}],
    required: true,
  },
  total_marks: {
    type: [{}],
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

const AcademicsModel = mongoose.model("Academics", academicsSchema);

module.exports = AcademicsModel;
