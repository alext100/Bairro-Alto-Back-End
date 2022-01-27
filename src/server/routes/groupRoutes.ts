import express from "express";
import {
  createGroup,
  getAllGroups,
  getOneGroupById,
  updateGroupById,
  deleteGroup,
  addGroupToAnyUser,
  deleteMemberFromGroup,
} from "../controllers/groupsController.js";
import paths from "../paths/paths.js";

const router = express.Router();

router.get(paths.getAll, getAllGroups);

router.post(paths.create, createGroup);

router.get(paths.getById, getOneGroupById);

router.put(paths.updateGroupById, updateGroupById);

router.patch(paths.addGroupToAnyUser, addGroupToAnyUser);

router.patch(paths.deleteMemberFromGroup, deleteMemberFromGroup);

router.delete(paths.delete, deleteGroup);

export default router;
