import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    isVerified: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
