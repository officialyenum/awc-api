const mongoose = require("mongoose");
const { Schema } = mongoose;

const MediaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    cloudinary_id: {
      type: String,
      required: true,
    },
    cloudinary_url: {
      type: String,
      required: false,
    },
    uploader: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Media", MediaSchema);
