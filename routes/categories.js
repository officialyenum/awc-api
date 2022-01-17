const router = require("express").Router();
const categoryController = require("../controllers/category");

//CREATE NEW Category
router.post("/", categoryController.createCategory);

//UPDATE Category
router.put("/:id", categoryController.updateCategory);

//DELETE Category
router.delete("/:id", categoryController.deleteCategory);

//GET Category
router.get("/:id", categoryController.getCategory);

//GET All Category
router.get("/", categoryController.getCategories);

module.exports = router;
