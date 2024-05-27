import { Router } from "express";
import {
  renderSigninPage,
  renderSignupPage,
  handleUserSignup,
  handleUserSignin,
} from "../controllers/user.controller.js";
const router = Router();

router.route("/signup").get(renderSignupPage).post(handleUserSignup);
router.route("/signin").get(renderSigninPage).post(handleUserSignin);

export default router;
