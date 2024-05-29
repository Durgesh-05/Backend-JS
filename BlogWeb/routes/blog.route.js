import { Router } from "express";
import {
  renderBlogPage,
  handleBlogPost,
} from "../controllers/blog.controller.js";
const router = Router();

router.route("/create-blog").get(renderBlogPage).post(handleBlogPost);

export default router;
