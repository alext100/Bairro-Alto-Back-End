import express from "express";
import {
  getWebContent,
  updateWebContent,
} from "../controllers/webContentControllers";
import paths from "../paths/paths";

const router = express.Router();

router.get(paths.getWebContent, getWebContent);

router.put(paths.updateWebContent, updateWebContent);

export default router;
