import express from "express";
import {
  handleUserRegister,
  handleUserLogin,
  handleCreateNewAccessToken,
  handleEmailVerification,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", handleUserRegister);
router.post("/login", handleUserLogin);
router.get("/refresh-token", handleCreateNewAccessToken);
router.get("/verify-email/:userId/:token", handleEmailVerification);

export { router };
