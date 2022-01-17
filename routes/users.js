const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const response = require("../utils/response");

//UPDATE
router.put("/:id", async (req, res) => {
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
});

//DELETE
router.delete("/:id", async (req, res) => {
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
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;

    response(res, "success", "succesfully retrieved user", others, 200);
  } catch (error) {
    response(res, "error", "User not found!", [], 404);
  }
});

//GET ALL USER
router.get("/", async (req, res) => {
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
});

module.exports = router;
