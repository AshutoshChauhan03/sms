const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
  },
  typeOf: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: String,
    required: true,
  },
});

const GalleryModel = mongoose.model("Uploads", gallerySchema);
module.exports = GalleryModel;
