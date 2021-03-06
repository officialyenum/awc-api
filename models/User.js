const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
    },
    avatar: {
      type: Schema.Types.ObjectId,
      ref: "Media",
      default: null,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("User", UserSchema);
