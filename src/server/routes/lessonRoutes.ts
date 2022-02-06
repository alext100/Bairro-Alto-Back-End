import express from "express";
import { addLesson } from "../controllers/lessonControllers.js";
import auth from "../middlewares/auth.js";
import firebase from "../middlewares/firebase.js";
import uploadImages from "../middlewares/uploadImages.js";
import paths from "../paths/paths.js";

const router = express.Router();

router.post(paths.uploadMedia, auth, uploadImages.array("images"), firebase);
router.post(paths.create, auth, addLesson);

export default router;
