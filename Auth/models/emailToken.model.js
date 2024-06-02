import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    emailToken: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Token = mongoose.model("Token", tokenSchema);
