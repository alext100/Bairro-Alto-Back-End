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
  addLessonToGroup,
} from "../controllers/groupsController.js";
import paths from "../paths/paths.js";

const router = express.Router();

router.get(paths.getAll, getAllGroups);

router.post(paths.create, createGroup);

router.get(paths.getById, getOneGroupById);

router.put(paths.updateGroupById, updateGroupById);

router.patch(paths.addGroupToAnyUser, addMemberToGroup);

router.patch(paths.deleteMemberFromGroup, deleteMemberFromGroup);

router.patch(paths.deleteLessonFromGroup, deleteLessonFromGroup);

router.patch(paths.addLessonToGroup, addLessonToGroup);

router.delete(paths.delete, deleteGroup);

export default router;
