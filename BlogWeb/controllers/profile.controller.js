import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";
async function renderUserProfile(req, res) {
  const allBlogsByUser = await Blog.find({
    author: req.params.userId,
  });
  const userData = await User.findById({ _id: req.params.userId });
  res.render("profile", {
    user: req.user,
    userData,
    blogs: allBlogsByUser,
  });
}

async function handleDeleteBlogFromProfile(req, res) {
  console.log(req.params);
  console.log(req.params.blogId);
  await Blog.deleteOne({ _id: req.params.blogId });
}

async function handleEditUserProfile(req, res) {
  const interest = req.body.interest.split(",");
  const { filename } = req.file;
  await User.findByIdAndUpdate(
    { _id: req.user._id },
    { interest: interest, profileImageUrl: `/uploads/${filename}` }
  );
  res.redirect(`/api/v1/profile/${req.user._id}`);
}

export {
  handleDeleteBlogFromProfile,
  handleEditUserProfile,
  renderUserProfile,
};
