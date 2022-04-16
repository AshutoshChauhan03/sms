require("../dbConnection");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

const DetailsModel = require("../Schema/details");
const UserModel = require("../Schema/user");
const AcademicsModel = require("../Schema/academics");
const LeaveModel = require("../Schema/leave");

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
  const student = await DetailsModel.findOne({ student_Id: studentId }).exec();
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

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, process.env.SECRET_KEY_ON_SERVER);
    if (payload.id === req.params.id) next();
    else return res.send({ err: "Unauthorized Access" });
  } catch (err) {
    return res.send({ err: "Unauthorized Access" });
  }
};

router.post("/academics/:id", verifyToken, async (req, res) => {
  const academic = new AcademicsModel(req.body);
  academic.save();
  return res.send({ msg: "Successful" });
});

router.post("/leave/:id", verifyToken, async (req, res) => {
  const { reason, start, end } = req.body;
  const id = req.params.id;

  const leaveBody = {
    student_Id: id,
    reason,
    start,
    end,
  };

  new LeaveModel(leaveBody).save();
  return res.send({ msg: "Successful" });
});

router.get("/leave/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const leaves = await LeaveModel.find({ student_Id: id });
  return res.status(200).send(leaves);
});

router.delete("/leave/:id/:_id", verifyToken, async (req, res) => {
  const _id = req.params._id;
  const response = await LeaveModel.findByIdAndDelete(_id);
  return res.status(200).send({ msg: "response" });
});

module.exports = router;
