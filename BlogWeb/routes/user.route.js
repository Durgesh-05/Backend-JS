import { Router } from "express";
import {
  renderSigninPage,
  renderSignupPage,
  handleUserSignup,
  handleUserSignin,
  handleUserLogout,
} from "../controllers/user.controller.js";
const router = Router();

router.route("/signup").get(renderSignupPage).post(handleUserSignup);
router.route("/signin").get(renderSigninPage).post(handleUserSignin);
router.get("/logout", handleUserLogout);
export default router;
