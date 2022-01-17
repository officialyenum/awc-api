const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const response = require("../utils/response");

//CREATE NEW POST
router.post("/", async (req, res) => {
  const newPost = await new Post(req.body);
  try {
    const savedPost = await newPost.save();
    response(res, "success", "post created successfully", savedPost, 200);
  } catch (error) {
    response(res, "error", error, [], 500);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username == req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        response(res, "success", "post updated successfuly", updatedPost, 200);
      } catch (error) {}
    } else {
      response(res, "error", "you can only delete your post", [], 401);
    }
  } catch (error) {
    response(res, "error", error, [], 500);
    res.status(500).json(error);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username == req.body.username) {
      try {
        await post.delete();
        response(res, "success", "Post has been deleted...", [], 200);
      } catch (error) {}
    } else {
      response(res, "error", "you can only delete your post", [], 401);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    response(res, "success", "Post retrieved successfully...", post, 200);
  } catch (error) {
    response(res, "error", error, [], 500);
  }
});

//GET All POST
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    response(res, "success", "Posts retrieved successfully...", posts, 200);
  } catch (error) {
    response(res, "error", error, [], 500);
  }
});

module.exports = router;
