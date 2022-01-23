const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
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


MediaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Media", MediaSchema);
