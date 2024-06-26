import mongoose, { Mongoose } from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    clickHistory: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const URL = mongoose.model("URL", urlSchema);
