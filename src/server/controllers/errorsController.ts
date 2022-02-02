import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Group from "../../database/models/group.js";
import StudentError from "../../database/models/studentError.js";
import { ErrorType, IUserRequest } from "../../utils/types.js";

const { Types } = mongoose;

const deleteErrorFromGroup = async (req: IUserRequest, res: Response) => {
  const { id: groupId } = req.params;
  const groupErrorId = req.body.id;
  try {
    const updatedGroup = await Group.findByIdAndUpdate(groupId, {
      $pull: { groupErrors: groupErrorId },
    });
    if (!updatedGroup) {
      return res.sendStatus(404);
    } else await StudentError.findByIdAndDelete(groupErrorId);
    res.json(updatedGroup.id);
  } catch (error) {
    (error as ErrorType).code = 500;
    return res.send(error);
  }
};

const updateGroupError = async (req: Request, res: Response) => {
  const { id } = req.params;
  const studentError = req.body;
  try {
    const updatedError = await StudentError.findByIdAndUpdate(
      id,
      studentError,
      {
        new: true,
      }
    );
    if (!updatedError) return res.sendStatus(404);
    return res.status(201).json(updatedError);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
};

const getAllGroupErrors = async (req: Request, res: Response) => {
  const { id: groupId } = req.params;
  try {
    const errors = await Group.findById(groupId)
      .populate("groupErrors")
      .select("groupErrors");
    res.json(errors);
  } catch (error) {
    res.status(404);
    return res.send(error);
  }
};

const addErrorToGroup = async (req: Request, res: Response) => {
  const { errorType, errorMessage, errorComment, date } = req.body;
  try {
    const newGroupError = await StudentError.create({
      errorType,
      errorMessage,
      errorComment,
      date,
    });
    if (!newGroupError) return res.sendStatus(404);
    const { id: groupId } = req.params;
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $push: { groupErrors: newGroupError.id } },
      { new: true }
    );
    if (!updatedGroup) return res.sendStatus(404);
    return res.json(updatedGroup);
  } catch (error) {
    (error as ErrorType).code = 500;
    return res.send(error);
  }
};

export {
  addErrorToGroup,
  getAllGroupErrors,
  deleteErrorFromGroup,
  updateGroupError,
};
