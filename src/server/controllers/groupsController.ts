import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ErrorType, IUserRequest } from "../../utils/types.js";
import Group from "../../database/models/group.js";
import User from "../../database/models/user.js";

const { Types } = mongoose;

const getAllGroups = async (req: IUserRequest, res: Response) => {
  const groups = await Group.find();
  res.json(groups);
};

const createGroup = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { groupName, members, homeworkToDo, lessons, groupErrors } = req.body;
  try {
    const newGroup = await Group.create({
      groupName,
      members,
      homeworkToDo,
      lessons,
      groupErrors,
    });
    res.status(201).json(newGroup);
  } catch (error) {
    (error as ErrorType).code = 400;
    next(error);
  }
};

const getOneGroupById = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const searchedGroup = await Group.findById(id);
    if (searchedGroup) {
      res.json(searchedGroup);
    } else {
      const error: ErrorType = new Error("Group not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    (error as ErrorType).code = 400;
    next(error);
  }
};

const updateGroupById = async (req: IUserRequest, res: Response) => {
  const { id } = req.params;
  const group = req.body;
  try {
    const updatedGroup = await Group.findByIdAndUpdate(id, group, {
      new: true,
    });
    if (!updatedGroup) return res.sendStatus(404);
    return res.status(201).json(updatedGroup);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
};

const deleteGroup = async (req: IUserRequest, res: Response) => {
  const { id } = req.params;
  try {
    await Group.findByIdAndDelete(id);
    res.json(200);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
};

const addMemberToGroup = async (req: IUserRequest, res: Response) => {
  const { id: userId } = req.params;
  const groupId = req.body.id;
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $push: { members: new Types.ObjectId(userId) } },
      { new: true }
    );
    if (!updatedGroup) return res.sendStatus(404);
    res.json(updatedGroup.id);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { studentGroups: new Types.ObjectId(groupId) } },
      { new: true }
    );
    if (!updatedUser) return res.sendStatus(404);
  } catch (error) {
    (error as ErrorType).code = 500;
    return res.send(error);
  }
};

const deleteMemberFromGroup = async (req: IUserRequest, res: Response) => {
  const { id: userId } = req.params;
  const groupId = req.body.id;
  try {
    const updatedUser = await Group.findByIdAndUpdate(
      groupId,
      { $pull: { members: new Types.ObjectId(userId) } },
      { new: true }
    );
    if (!updatedUser) return res.sendStatus(404);
    res.json(updatedUser.id);

    const updatedGroup = await User.findByIdAndUpdate(
      userId,
      { $pull: { studentGroups: new Types.ObjectId(groupId) } },
      { new: true }
    );
    if (!updatedGroup) return res.sendStatus(404);
  } catch (error) {
    (error as ErrorType).code = 500;
    return res.send(error);
  }
};

const deleteLessonFromGroup = async (req: Request, res: Response) => {
  const { id: groupId } = req.params;
  const lessonId = req.body.id;
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $pull: { lessons: lessonId } },
      { new: true }
    );
    if (!updatedGroup) return res.sendStatus(404);
    res.json(200);
  } catch (error) {
    (error as ErrorType).code = 500;
    return res.send(error);
  }
};

const addLessonToGroup = async (req: Request, res: Response) => {
  const { id: groupId } = req.params;
  const lessonId = req.body.id;
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $push: { lessons: lessonId } },
      { new: true }
    );
    if (!updatedGroup) return res.sendStatus(404);
    res.json(200);
  } catch (error) {
    (error as ErrorType).code = 500;
    return res.send(error);
  }
};

export {
  createGroup,
  deleteGroup,
  getAllGroups,
  getOneGroupById,
  updateGroupById,
  addMemberToGroup,
  addLessonToGroup,
  deleteMemberFromGroup,
  deleteLessonFromGroup,
};
