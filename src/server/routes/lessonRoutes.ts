import express from "express";
import {
  addLesson,
  deleteLesson,
  getAllLessons,
  updateLessonById,
} from "../controllers/lessonControllers.js";
import auth from "../middlewares/auth.js";
import firebase from "../middlewares/firebase.js";
import uploadImages from "../middlewares/uploadImages.js";
import uploadAudio from "../middlewares/uploadAudio.js";
import paths from "../paths/paths.js";

const router = express.Router();

router.post(paths.uploadMedia, auth, uploadImages.array("images"), firebase);
router.post(paths.uploadAudio, auth, uploadAudio.array("audio"), firebase);
router.post(paths.create, auth, addLesson);

router.get(paths.getAll, auth, getAllLessons);

router.put(paths.updateById, auth, updateLessonById);

router.delete(paths.delete, auth, deleteLesson);

export default router;
