import { Blog } from "../models/blog.model.js";
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
  const blog = await Blog.findById(req.params.id);
  return res.render("blogpost", {
    user: req.user,
    blog,
  });
}

export { renderBlogPage, handleBlogPost, renderBlogPostPage };
