const express = require("express");
const router = express.Router();
const multer = require("multer");
const GalleryModel = require("../Schema/gallery.js");
const path = require("path");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    var filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    } else {
    }
    cb(null, "image-" + Date.now() + "." + filetype);
  },
});

var upload = multer({ storage: storage });

router.get("/:student_id/:typeOf/:imageName", (req, res) => {
  const { student_id, typeOf, imageName } = req.params;
  GalleryModel.findOne({ student_id, typeOf, imageName }, (err, items) => {
    if (!items) {
      return res.status(500).send({ err: "Cannot find file !" });
    } else {
      const filepath = path.join(__dirname, "..", "uploads", items.imageName);
      return res.sendFile(filepath);
    }
  });
});

router.post("/", upload.single("file"), function (req, res, next) {
  if (!req.file) {
    return res.status(500).send({ message: "Upload fail" });
  } else {
    var obj = {
      student_id: req.body.student_id,
      typeOf: req.body.typeOf,
      imageName: req.file.filename,
      uploadDate: new Date().toLocaleString(),
    };
    GalleryModel.create(obj, function (err, gallery) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.status(200).send({ msg: req.file.filename });
    });
  }
});

module.exports = router;
