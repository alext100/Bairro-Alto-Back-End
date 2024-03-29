import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Group from "../../database/models/group.js";
import User from "../../database/models/user.js";
import { ErrorType, IUserRequest } from "../../utils/types.js";

const { Types } = mongoose;

const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  for (const user of users) {
    user.password = "";
    user.confirmationCode = "";
  }
  res.json(users);
};

const getOneUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const searchedUsers = await User.findById(id);
    if (searchedUsers) {
      res.json(searchedUsers);
    } else {
      const error: ErrorType = new Error("User not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    (error as ErrorType).code = 400;
    next(error);
  }
};

const addGroupToTeacher = async (req: IUserRequest, res: Response) => {
  const { id: groupId } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $push: { teacherGroups: new Types.ObjectId(groupId) } },
      { new: true }
    );
    if (!updatedUser) return res.sendStatus(404);

    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $push: { teachers: new Types.ObjectId(req.userId) } },
      { new: true }
    );
    if (!updatedGroup) return res.sendStatus(404);
    res.json(updatedUser);
  } catch (error) {
    (error as ErrorType).code = 500;
    return res.send(error);
  }
};

const getAllTeachers = async (req: Request, res: Response) => {
  const users = await User.find();
  const teachers = users.filter((teacher) => teacher.teacherAccess === true);
  res.json(teachers);
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json(200);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
};

const getAllTeachersGroups = async (req: IUserRequest, res: Response) => {
  try {
    const groups = await User.findById(req.userId)
      .populate("teacherGroups")
      .select("teacherGroups");
    res.json(groups);
  } catch (error) {
    res.status(404);
    return res.send(error);
  }
};

const deleteGroupFromUser = async (req: IUserRequest, res: Response) => {
  const { id: groupId } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(req.userId, {
      $pull: { teacherGroups: groupId },
    });
    if (!updatedUser) return res.sendStatus(404);
    const updatedGroup = await Group.findByIdAndUpdate(groupId, {
      $pull: { teachers: req.userId },
    });
    if (!updatedGroup) return res.sendStatus(404);
    res.json(updatedUser);
  } catch (error) {
    (error as ErrorType).code = 500;
    return res.send(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { user } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(user.id, user, {
      new: true,
    });
    if (!updatedUser) return res.sendStatus(404);
    return res.status(201).json(updatedUser);
  } catch (error) {
    (error as ErrorType).code = 500;
    return res.send(error);
  }
};

export {
  getUsers,
  deleteUser,
  updateUser,
  getAllTeachers,
  getOneUserById,
  addGroupToTeacher,
  deleteGroupFromUser,
  getAllTeachersGroups,
};
