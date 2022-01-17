import express from "express";
import createUser from "../controllers/createUser.js";
import loginUser from "../controllers/loginUser.js";
import {
  addErrorToGroup,
  addGroupToUser,
  deleteErrorFromUser,
  deleteGroupFromUser,
  deleteUser,
  getAllTeachers,
  getAllUserErrors,
  getAllUsersGroups,
  getOneUserById,
  getUsers,
  updateGroupError,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import paths from "../paths/paths.js";

const router = express.Router();

router.post(paths.userRegister, createUser);
router.post(paths.userLogin, loginUser);

router.get(paths.getAll, getUsers);
router.get(paths.getById, getOneUserById);
router.get(paths.getAllTeachers, getAllTeachers);
router.get(paths.getAllUsersGroups, auth, getAllUsersGroups);
router.get(paths.getAllUserErrors, getAllUserErrors);

router.patch(paths.addGroupToUser, auth, addGroupToUser);
router.patch(paths.addErrorToGroup, addErrorToGroup);
router.patch(paths.deleteGroupFromUser, auth, deleteGroupFromUser);
router.patch(paths.deleteErrorFromUser, deleteErrorFromUser);

router.put(paths.update, updateGroupError);

router.delete(paths.delete, deleteUser);

export default router;
