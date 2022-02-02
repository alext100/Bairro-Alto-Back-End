import express from "express";
import createUser from "../controllers/createUser.js";
import loginUser from "../controllers/loginUser.js";
import {
  addGroupToTeacher,
  deleteGroupFromUser,
  deleteUser,
  getAllTeachers,
  getAllTeachersGroups,
  getOneUserById,
  getUsers,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import paths from "../paths/paths.js";

const router = express.Router();

router.post(paths.userRegister, createUser);
router.post(paths.userLogin, loginUser);

router.get(paths.getAll, getUsers);
router.get(paths.getById, getOneUserById);
router.get(paths.getAllTeachers, getAllTeachers);
router.get(paths.getAllUsersGroups, auth, getAllTeachersGroups);

router.patch(paths.addGroupToUser, auth, addGroupToTeacher);
router.patch(paths.deleteGroupFromUser, auth, deleteGroupFromUser);

router.delete(paths.delete, deleteUser);

export default router;
