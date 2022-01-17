const router = require("express").Router();
const mediaController = require("../controllers/media");
const upload = require("../utils/multer");

//CREATE NEW Media
router.post("/", upload.single("image"), mediaController.createMedia);

//UPDATE Media
router.put("/:id", upload.single("image"), mediaController.updateMedia);

//DELETE Media
router.delete("/:id", mediaController.deleteMedia);

//GET Media
router.get("/:id", mediaController.getMedia);

//GET All Media
router.get("/", mediaController.getMedias);

module.exports = router;
