import { Router } from "express";
import {
  handleDeleteBlogFromProfile,
  handleEditUserProfile,
  renderUserProfile,
} from "../controllers/profile.controller.js";
import { upload } from "../services/multer.js";

const router = Router();

router.get("/:userId", renderUserProfile);
router.post("/:userId/:blogId/delete", handleDeleteBlogFromProfile);
router.post(
  "/:userId/edit",
  upload.single("profileImage"),
  handleEditUserProfile
);

export default router;
