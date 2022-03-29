require("../dbConnection");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

const DetailsModel = require("../Schema/details");
const UserModel = require("../Schema/user");

const verifyTokenPermissions = async (req, res, next) => {
  const { id } = req.params;
  const flag = await UserModel.findOne({ id }).exec();

  if (flag) {
    if (flag.adminStatus) {
      next();
    } else {
      return res.status(200).send({ msg: "Invalid permissions" });
    }
  } else {
    return res.status(200).send({ msg: "User doesn't exists" });
  }
};

router.post("/details/:id", verifyTokenPermissions, async (req, res) => {
  let token = "";
  try {
    token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(200).send({ err: "Unauthorized Request" });
  } catch (err) {
    return res.status(200).send({ err: "Unauthorized Request" });
  }

  try {
    await jwt.verify(token, process.env.SECRET_KEY_ON_SERVER);
  } catch {
    return res.status(200).send({ err: "Invalid Token" });
  }

  const { studentId: temp } = req.body;
  const response = await UserModel.findOne({ id: temp }).exec();
  if (response) return res.status(200).send({ msg: "Student already exists" });

  const studentBody = req.body;

  let newDetails = new DetailsModel(studentBody);
  newDetails.save((err, registeredDetails) => {
    if (err) return res.status(200).send(err);
    else return res.status(200).send({ msg: "Added Successfully !" });
  });
});

router.get("/details/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const student = await DetailsModel.findOne({ studentId }).exec();
  if (student) return res.status(200).send(student);
  else return res.status(200).send({ msg: "Student doesn't exists" });
});

router.patch("/details/:id", verifyTokenPermissions, async (req, res) => {
  let token = "";
  try {
    token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(200).send({ err: "Unauthorized Request" });
  } catch (err) {
    return res.status(200).send({ err: "Unauthorized Request" });
  }

  try {
    await jwt.verify(token, process.env.SECRET_KEY_ON_SERVER);
  } catch {
    return res.status(200).send({ err: "Invalid Token" });
  }

  const paramsToUpdate = req.body;

  const { studentId } = req.body;
  const response = await DetailsModel.findOneAndUpdate(
    { studentId },
    paramsToUpdate,
    {
      new: true,
    }
  );
  if (response) return res.status(200).send({ msg: "Updated Successfully" });
  else return res.status(200).send({ msg: "Update Failed" });
});

router.delete("/details/:id", verifyTokenPermissions, async (req, res) => {
  let token = "";
  try {
    token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(200).send({ err: "Unauthorized Request" });
  } catch (err) {
    return res.status(200).send({ err: "Unauthorized Request" });
  }

  try {
    await jwt.verify(token, process.env.SECRET_KEY_ON_SERVER);
  } catch {
    return res.status(200).send({ err: "Invalid Token" });
  }

  const { studentId } = req.body;
  console.log(studentId);
  const response = await DetailsModel.findOne({ studentId }).exec();
  if (!response) return res.status(200).send({ msg: "User doesn't exists" });

  DetailsModel.findOneAndDelete({ studentId }, (err, result) => {
    if (err) {
      console.log(err);
      return res.send({ msg: "Deletion Error" });
    } else return res.status(200).send({ msg: "Deleted Successfully" });
  });
});

module.exports = router;
