import express from "express";
import { handleRenderHTMLTemplate } from "../controllers/url.controller.js";
const router = express.Router();

router.get("/", handleRenderHTMLTemplate);

export { router };
