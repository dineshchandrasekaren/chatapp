import { Schema, model } from "../config/db.config.js";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
