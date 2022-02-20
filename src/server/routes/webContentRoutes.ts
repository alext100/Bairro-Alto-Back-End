import express from "express";
import {
  getWebContent,
  updateWebContent,
} from "../controllers/webContentControllers.js";
import paths from "../paths/paths.js";

const router = express.Router();

router.get(paths.getWebContent, getWebContent);

router.put(paths.updateWebContent, updateWebContent);

export default router;
