const router = require("express").Router();
const Category = require("../models/Category");
const response = require("../utils/response");

//CREATE NEW Category
router.post("/", async (req, res) => {
  const newCategory = await new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    response(res, "success", "Category saved successfully", savedCategory, 200);
  } catch (error) {
    response(res, "error", error, [], 500);
  }
});

//UPDATE Category
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (req.body.username === "yenum") {
      try {
        const updatedCategory = await category.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );

        response(
          res,
          "success",
          "Category updated successfully",
          updatedCategory,
          200
        );
      } catch (error) {}
    } else {
      response(res, "error", "only yenum can update Category", [], 401);
    }
  } catch (error) {
    response(res, "error", error, [], 500);
  }
});

//DELETE Category
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (req.body.username == "yenum") {
      try {
        await category.delete();
        response(res, "success", "Category deleted successfully", [], 200);
      } catch (error) {}
    } else {
      response(res, "error", "only yenum can delete Category", [], 500);
    }
  } catch (error) {
    response(res, "error", error, [], 500);
  }
});

//GET Category
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    response(res, "success", "Category retrieved successfully", category, 200);
  } catch (error) {
    response(res, "error", error, [], 500);
  }
});

//GET All Category
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    response(
      res,
      "success",
      "Categories retrieved successfully",
      categories,
      200
    );
  } catch (error) {
    response(res, "error", error, [], 500);
  }
});

module.exports = router;
