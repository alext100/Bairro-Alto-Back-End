import express from "express";
import {
  addLesson,
  deleteLesson,
  getAllCourseNames,
  getAllGroupLessons,
  getAllLessons,
  updateLessonById,
} from "../controllers/lessonControllers.js";
import auth from "../middlewares/auth.js";
import firebase from "../middlewares/firebase.js";
import uploadImages from "../middlewares/uploadImages.js";
import uploadAudio from "../middlewares/uploadAudio.js";
import paths from "../paths/paths.js";
import teacherAuth from "../middlewares/teacherAuth.js";
import sharpImages from "../middlewares/sharpImages.js";

const router = express.Router();

router.post(
  paths.uploadMedia,
  auth,
  uploadImages.array("images"),
  sharpImages,
  firebase
);
router.post(paths.uploadAudio, auth, uploadAudio.array("audio"), firebase);
router.post(paths.create, auth, teacherAuth, addLesson);

router.get(paths.getAll, auth, getAllLessons);
router.get(paths.getAllGroupLessons, auth, getAllGroupLessons);
router.get(paths.getAllCourseNames, auth, getAllCourseNames);

router.put(paths.updateById, auth, teacherAuth, updateLessonById);

router.delete(paths.delete, auth, teacherAuth, deleteLesson);

export default router;
