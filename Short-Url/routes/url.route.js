import express from "express";
import {
  handleGenerateShortURL,
} from "../controllers/url.controller.js";
const router = express.Router();

router.post("/", handleGenerateShortURL)

export { router };
