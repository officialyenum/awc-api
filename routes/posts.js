const router = require("express").Router();
const postController = require("../controllers/post");

//CREATE NEW POST
router.post("/", postController.createPost);

//UPDATE POST
router.put("/:id", postController.updatePost);

//DELETE POST
router.delete("/:id", postController.deletePost);

//GET POST
router.get("/:id", postController.getPost);

//GET All POST
router.get("/", postController.getPosts);

module.exports = router;
