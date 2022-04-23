import express from "express";
import {
  deleteCategory,
  deletePost,
  getWebContent,
  updatePostById,
  updateWebContent,
} from "../controllers/webContentControllers.js";
import adminAuth from "../middlewares/adminAuth.js";
import auth from "../middlewares/auth.js";
import paths from "../paths/paths.js";
import configureFirebaseBucketCors from "../middlewares/configureFirebaseBucketCors.js";

const router = express.Router();

router.get(paths.getWebContent, configureFirebaseBucketCors, getWebContent);

router.put(paths.updateWebContent, auth, adminAuth, updateWebContent);
router.put(paths.updatePost, auth, adminAuth, updatePostById);

router.delete(paths.deletePost, auth, adminAuth, deletePost);
router.delete(paths.deleteCategory, auth, adminAuth, deleteCategory);

export default router;
