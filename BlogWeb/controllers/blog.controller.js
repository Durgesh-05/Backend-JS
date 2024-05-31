import { Blog } from "../models/blog.model.js";
import { Comment } from "../models/comment.model.js";
import { Like } from "../models/like.model.js";
function renderBlogPage(req, res) {
  res.render("blog", {
    user: req.user,
  });
}

async function handleBlogPost(req, res) {
  const { title, content } = req.body;
  const { filename } = req.file;

  await Blog.create({
    title: title,
    content: content,
    coverImageURL: `/uploads/${filename}`,
    author: req.user._id,
  });

  res.redirect("/");
}

async function renderBlogPostPage(req, res) {
  try {
    const blog = await Blog.findById(req.params.id).populate("author");
    const comments = await Comment.find({ blogId: req.params.id }).populate(
      "createdBy"
    );

    return res.render("blogpost", {
      user: req.user,
      blog,
      comments,
    });
  } catch (error) {
    console.log("Internal Server Error: ", error);
  }
}

async function handleUserComment(req, res) {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });

  await Blog.updateOne(
    { _id: req.params.blogId },
    { $inc: { noOfComments: 1 } }
  );
  return res.redirect(`/api/v1/blog/${req.params.blogId}`);
}

async function handleUserLike(req, res) {
  const result = await Like.find({
    blogId: req.params.blogId,
    likedBy: req.user._id,
  });
  if (result.length > 0)
    return res.redirect(`/api/v1/blog/${req.params.blogId}`);
  await Like.create({
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });

  await Blog.updateOne({ _id: req.params.blogId }, { $inc: { noOfLikes: 1 } });
  return res.redirect(`/api/v1/blog/${req.params.blogId}`);
}

export {
  renderBlogPage,
  handleBlogPost,
  renderBlogPostPage,
  handleUserComment,
  handleUserLike,
};
