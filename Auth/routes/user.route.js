import express from "express";
import {
  handleUserRegister,
  handleUserLogin,
  handleCreateNewAccessToken,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", handleUserRegister);
router.post("/login", handleUserLogin);
router.get("/refresh-token", handleCreateNewAccessToken);

export { router };
