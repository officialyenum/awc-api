const router = require("express").Router();
const userController = require("../controllers/user");
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
router.post("/register", userController.register);

//Login
router.post("/login", userController.login);

module.exports = router;
