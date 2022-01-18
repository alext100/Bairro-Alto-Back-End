import express from "express";
import {
  addErrorToGroup,
  deleteErrorFromGroup,
  getAllGroupErrors,
  updateGroupError,
} from "../controllers/errorsController.js";
import paths from "../paths/paths.js";

const router = express.Router();

router.get(paths.getAllGroupErrors, getAllGroupErrors);

router.patch(paths.addErrorToGroup, addErrorToGroup);
router.patch(paths.deleteErrorFromGroup, deleteErrorFromGroup);

router.put(paths.updateGroupError, updateGroupError);

export default router;
