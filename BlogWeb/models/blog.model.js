import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImageURL: {
      type: String,
    },
    noOfLikes: {
      type: Number,
      default: 0,
    },
    noOfComments: {
      type: Number,
      default: 0,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
