const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: Schema.Types.ObjectId,
      ref: "Media",
    },
    username: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
