// env config
require("dotenv").config();
// db connection import
require("../dbConnection");

// imports
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("./email.js");
router.use(bodyParser.json());

// importing db schema
const UserModel = require("../Schema/user");

// middleware for token verification
const verifyToken = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(200).send({ err: "Unauthorized Request" });

  try {
    jwt.verify(token, process.env.SECRET_KEY_ON_SERVER);
    next();
  } catch (err) {
    return res.status(200).send({ err: "Unauthorized Request" });
  }
};

// handling session
router.post("/session", verifyToken, (req, res) => {
  res.status(200).send({ response: "true" });
});

// handling signin
router.post("/signin", async (req, res) => {
  // destructing request body
  const { id, password, adminStatus } = req.body;

  // check if user exists
  const user = await UserModel.find().then((userList) => {
    return userList.find((user) => user.id === id);
  });

  if (user === undefined) return res.send({ error: "User Doesn't Exists" });
  else {
    // user exists
    // check password
    bcrypt.compare(password, user.password, (err, result) => {
      if (adminStatus != user.adminStatus)
        return res.send({ error: "Invalid Credentials" });
      if (!result) return res.send({ error: "Invalid Credentials" });
      else {
        // creating jwt token
        let payload = { id: user.id };
        let token = jwt.sign(payload, process.env.SECRET_KEY_ON_SERVER, {
          expiresIn: "1d",
        });
        return res.status(200).send({ token });
      }
    });
  }
});

// handling register user
router.post("/register", async (req, res) => {
  // destructing request body
  const { id, password, adminStatus, phoneNumber } = req.body;

  // check if user exists
  const user = await UserModel.find().then((userList) => {
    return userList.find((user) => user.id === id);
  });

  if (user) return res.status(400).send({ error: "User already Exists !" });

  let encryptedPass = await bcrypt.hash(password, 10);
  let newUser = new UserModel({
    id,
    password: encryptedPass,
    adminStatus,
    phoneNumber,
    otpStatus: false,
  });

  newUser.save((err, registeredUser) => {
    if (err) return res.status(400).send(err);
    else {
      let payload = { id: registeredUser.id };
      let token = jwt.sign(payload, process.env.SECRET_KEY_ON_SERVER, {
        expiresIn: "1d",
      });
      return res.status(200).send({ token });
    }
  });
});

// RESET PASSWORD
// handling forgot password otp sent
router.post("/forgotpassword", async (req, res) => {
  const { id, phoneNumber } = req.body;
  const response = await UserModel.findOne({ id: id }).exec();
  if (response) {
    if (response.phoneNumber == phoneNumber) {
      const uuid = uuidv4();
      const otp = jwt.sign({ uuid }, process.env.SECRET_KEY_ON_SERVER, {
        expiresIn: "10m",
      });

      const resetLink = `http://localhost:${process.env.PORT}/auth/resetpassword/${id}/${otp}`;

      // send this resetLink to user email address
      sendEmail(id, resetLink).then((data) => {
        console.log(`Reset Link sent to email --> ${id}...`);
      });

      return res
        .status(200)
        .send({ Success: "OTP SENT ( VALID FOR 10 Minutes )" });
    } else {
      return res.status(200).send({ error: "Invalid Details" });
    }
  } else {
    return res.status(200).send({ error: "User doesn't exists" });
  }
});
// handling sent otp verification
router.get("/resetpassword/:id/:otp", async (req, res) => {
  const { id, otp } = req.params;

  try {
    await jwt.verify(otp, process.env.SECRET_KEY_ON_SERVER);
    await UserModel.findOneAndUpdate(
      { id },
      {
        otpStatus: true,
      }
    );
    return res
      .status(200)
      .send({ msg: "Go back to browser to reset password" });
  } catch (err) {
    return res.status(400).send({ msg: "Invalid Access" });
  }
});
// handling reset password
router.patch("/resetpassword/id/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const flag = await UserModel.findOne({ id: id }).exec();
  if (flag) {
    if (flag.otpStatus) {
      flag.otpStatus = false;
      encryptedPass = await bcrypt.hash(password, 10);
      flag.password = encryptedPass;
      flag.save();
      return res.status(200).send({ msg: "Password Reset Successful !" });
    } else {
      return res.status(200).send({ msg: "OTP not verified" });
    }
  } else {
    return res.status(200).send({ msg: "User doesn't exists" });
  }
});

// return adminstatus of particular user
router.get("/adminstatus", verifyToken, async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const payload = await jwt.verify(token, process.env.SECRET_KEY_ON_SERVER);
  const role = await UserModel.findOne({ id: payload.id });
  if (role.adminStatus) return res.send({ msg: true });
  else return res.send({ msg: false });
});

module.exports = router;
