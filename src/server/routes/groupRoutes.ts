import express from "express";
import {
  createGroup,
  getAllGroups,
  getOneGroupById,
  updateGroupById,
  deleteGroup,
  addMemberToGroup,
  deleteMemberFromGroup,
  deleteLessonFromGroup,
  toggleLessonInGroup,
} from "../controllers/groupsController.js";
import adminAuth from "../middlewares/adminAuth.js";
import auth from "../middlewares/auth.js";
import teacherAuth from "../middlewares/teacherAuth.js";
import paths from "../paths/paths.js";

const router = express.Router();

router.get(paths.getAll, auth, teacherAuth, getAllGroups);

router.post(paths.create, auth, teacherAuth, createGroup);

router.get(paths.getById, getOneGroupById);

router.put(paths.updateGroupById, auth, teacherAuth, updateGroupById);

router.patch(paths.addGroupToAnyUser, auth, teacherAuth, addMemberToGroup);

router.patch(
  paths.deleteMemberFromGroup,
  auth,
  teacherAuth,
  deleteMemberFromGroup
);

router.patch(
  paths.deleteLessonFromGroup,
  auth,
  teacherAuth,
  deleteLessonFromGroup
);

router.patch(paths.addLessonToGroup, auth, teacherAuth, toggleLessonInGroup);

router.delete(paths.delete, auth, adminAuth, deleteGroup);

export default router;
