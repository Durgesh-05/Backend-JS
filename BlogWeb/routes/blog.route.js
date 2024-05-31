import { Router } from "express";
import {
  renderBlogPage,
  handleBlogPost,
  renderBlogPostPage,
  handleUserComment,
  handleUserLike,
} from "../controllers/blog.controller.js";
import { upload } from "../services/multer.js";
const router = Router();

router
  .route("/create-blog")
  .get(renderBlogPage)
  .post(upload.single("coverImage"), handleBlogPost);

router.get("/:id", renderBlogPostPage);
router.post("/comment/:blogId", handleUserComment);
router.post("/like/:blogId", handleUserLike);

export default router;
