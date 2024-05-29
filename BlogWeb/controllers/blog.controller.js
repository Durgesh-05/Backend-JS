function renderBlogPage(req, res) {
  res.render("blog", {
    user: req.user,
  });
}

function handleBlogPost(req, res) {
  return res.json({ msg: "hello" });
}

export { renderBlogPage, handleBlogPost };
