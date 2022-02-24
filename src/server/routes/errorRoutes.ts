import express from "express";
import {
  addErrorToGroup,
  deleteErrorFromGroup,
  getAllGroupErrors,
  updateGroupError,
} from "../controllers/errorsController.js";
import auth from "../middlewares/auth.js";
import teacherAuth from "../middlewares/teacherAuth.js";
import paths from "../paths/paths.js";

const router = express.Router();

router.get(paths.getAllGroupErrors, getAllGroupErrors);

router.patch(paths.addErrorToGroup, auth, teacherAuth, addErrorToGroup);
router.patch(
  paths.deleteErrorFromGroup,
  auth,
  teacherAuth,
  deleteErrorFromGroup
);

router.put(paths.updateGroupError, auth, teacherAuth, updateGroupError);

export default router;
