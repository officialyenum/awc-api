const router = require("express").Router();
const userController = require("../controllers/user");
const response = require("../utils/response");

//UPDATE
router.put("/:id", userController.updateUser);

//DELETE
router.delete("/:id", userController.deleteUser);

//GET USER
router.get("/:id", userController.getUser);

//GET ALL USER
router.get("/", userController.getUsers);

module.exports = router;
