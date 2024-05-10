import express from "express";
import {
  handleRedirectUrl,
} from "../controllers/url.controller.js";
const router = express.Router();

router.get("/:shortId", handleRedirectUrl);

export { router };
