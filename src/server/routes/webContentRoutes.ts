import express from "express";
import {
  deletePost,
  getWebContent,
  updateWebContent,
} from "../controllers/webContentControllers.js";
import auth from "../middlewares/auth.js";
import paths from "../paths/paths.js";

const router = express.Router();

router.get(paths.getWebContent, auth, getWebContent);

router.put(paths.updateWebContent, auth, updateWebContent);

router.delete(paths.deleteWebContent, auth, deletePost);

export default router;
