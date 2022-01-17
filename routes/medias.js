const router = require("express").Router();
const Media = require("../models/Media");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const response = require("../utils/response");

//CREATE NEW Media
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "awc",
    });
    const newMedia = await new Media({
      title: result.original_filename,
      cloudinary_id: result.public_id,
      cloudinary_url: result.secure_url,
      uploader: req.body.username,
    });
    const savedMedia = await newMedia.save();
    response(res, "success", "Media uploaded successfully", savedMedia, 200);
  } catch (error) {
    response(res, "error", error, [], 500);
  }
});

//UPDATE Media
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let updatedMedia = await Media.findById(req.params.id);
    if (req.body.username === "yenum") {
      await cloudinary.uploader.destroy(updatedMedia.cloudinary_id, {
        folder: "awc",
      });
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "awc",
      });
      const data = {
        title: result.original_filename || updatedMedia.title,
        cloudinary_id: result.public_id || updatedMedia.cloudinary_id,
        cloudinary_url: result.secure_url || updatedMedia.cloudinary_url,
        uploader: req.body.username || updatedMedia.uploader,
      };
      updatedMedia = await Media.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });
      response(
        res,
        "success",
        "Media has been updated successfully...",
        updatedMedia,
        200
      );
    } else {
      response(res, "error", "only yenum can update Media", updatedMedia, 401);
    }
  } catch (error) {
    response(res, "error", error, [], 500);
  }
});

//DELETE Media
router.delete("/:id", async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (req.body.username == "yenum") {
      try {
        // delete media from cloudinary
        await cloudinary.uploader.destroy(media.cloudinary_id, {
          folder: "awc",
        });
        // delete media from mongodb
        await media.remove();
        response(
          res,
          "success",
          "Media has been deleted successfully...",
          [],
          200
        );
      } catch (error) {}
    } else {
      response(res, "error", "only yenum can delete Media", [], 401);
    }
  } catch (error) {
    response(res, "error", error, [], 500);
  }
});

//GET Media
router.get("/:id", async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    response(
      res,
      "success",
      "Media has been retrieved successfully...",
      media,
      200
    );
  } catch (error) {
    response(res, "error", error, [], 500);
  }
});

//GET All Media
router.get("/", async (req, res) => {
  try {
    const medias = await Media.find();
    response(
      res,
      "success",
      "Medias has been retrieved successfully...",
      medias,
      200
    );
  } catch (error) {
    response(res, "error", error, [], 500);
  }
});

module.exports = router;
