const User = require("../models/User");
const Media = require("../models/Media");
const bcrypt = require("bcrypt");
const response = require("../utils/response");

exports.register = async (req, res) => {
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
};

exports.login = async (req, res) => {
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
};
exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const user = await User.findById(req.params.id);
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        response(res, "success", "succesfully updated", updatedUser, 200);
      } catch (err) {
        response(res, "error", err, [], 500);
      }
    } catch (error) {
      response(res, "error", "User not found!", [], 404);
    }
  } else {
    response(res, "error", "you can only update your account", [], 401);
    // res.status(401).json("you can only update your account");
  }
};

exports.deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        response(res, "success", "user has been deleted...", [], 200);
      } catch (err) {
        response(res, "error", err, [], 500);
      }
    } catch (error) {
      response(res, "error", "User not found!", [], 404);
    }
  } else {
    response(res, "error", "you can only delete your account", [], 401);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("avatar")
      .select("-_v");
    const { password, ...others } = user._doc;

    response(res, "success", "succesfully retrieved user", others, 200);
  } catch (error) {
    response(res, "error", "User not found!", [], 404);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const data = users.map((user) => {
      const { password, ...others } = user._doc;
      return others;
    });
    response(res, "success", "succesfully retrieved users", data, 200);
  } catch (error) {
    response(res, "error", "User not found!", [], 404);
  }
};

exports.addAvatar = async (req, res) => {
  try {
    console.log(req.body);
    const avatar = await Media.findById(req.body.media_id);
    console.log(avatar);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: avatar,
      },
      { new: true }
    );
    response(res, "success", "succesfully Added Avatar user", updatedUser, 200);
  } catch (error) {
    response(res, "error", error, [], 500);
  }
};
