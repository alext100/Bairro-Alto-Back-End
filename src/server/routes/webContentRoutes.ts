import express from "express";
import {
  deleteCategory,
  deletePost,
  getWebContent,
  updatePostById,
  updateWebContent,
} from "../controllers/webContentControllers.js";
import auth from "../middlewares/auth.js";
import paths from "../paths/paths.js";

const router = express.Router();

router.get(paths.getWebContent, auth, getWebContent);

router.put(paths.updateWebContent, auth, updateWebContent);
router.put(paths.updatePost, auth, updatePostById);

router.delete(paths.deletePost, auth, deletePost);
router.delete(paths.deleteCategory, auth, deleteCategory);

export default router;
