const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  student_Id: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

const LeaveModel = mongoose.model("Leave", leaveSchema);
module.exports = LeaveModel;
