import { Router } from "express";
import { Blog } from "../models/blog.model.js";
const router = Router();

router.post("/", async (req, res) => {
  const query = req.body.search;
  const result = await Blog.find({ content: { $regex: query, $options: "i" } });
  res.render("search", { user: req.user, blogs: result });
});

export default router;
