const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const response = require("../utils/response");

// Home
router.post("/", async (req, res) => {
  try {
    response(
      res,
      "success",
      "Welcome to Afterworkchills Api Endpoint",
      [],
      200
    );
  } catch (err) {
    response(res, "error", err, [], 500);
  }
});

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    const { password, ...others } = user._doc;
    response(res, "success", "User Registered successfully", others, 200);
  } catch (err) {
    response(res, "error", err, [], 500);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    !user && res.status(400).json("Wrong Username Credentials");
    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong Password Credentials");
    const { password, ...others } = user._doc;
    response(res, "success", "logged in successfully", others, 200);
    res.status(200).json(others);
  } catch (err) {
    response(res, "error", err, [], 500);
  }
});

module.exports = router;
