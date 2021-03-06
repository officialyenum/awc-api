const Media = require("../models/Media");
const cloudinary = require("../utils/cloudinary");
const response = require("../utils/response");

exports.createMedia = async (req, res) => {
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
    console.log(error);
    response(res, "error", error, [], 500);
  }
};

exports.updateMedia = async (req, res) => {
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
};

exports.deleteMedia = async (req, res) => {
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
};

exports.getMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.param.id).select("-__v");
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
};

exports.getMedias = async (req, res) => {
  try {
    const medias = await Media.find().select("-__v");
    response(res, "success", "Medias retrieved successfully", medias, 200);
  } catch (error) {
    response(res, "error", error, [], 500);
  }
};
