import express from "express";
import createUser from "../controllers/createUser.js";
import loginUser from "../controllers/loginUser.js";
import { getUsers } from "../controllers/userController.js";
import paths from "../paths/paths.js";

const router = express.Router();

router.post(paths.userRegister, createUser);
router.post(paths.userLogin, loginUser);
router.get(paths.getAll, getUsers);

export default router;
