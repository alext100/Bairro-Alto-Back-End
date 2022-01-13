import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import StudentError from "../../database/models/studentError.js";
import User from "../../database/models/user.js";
import { ErrorType, IUserRequest } from "../../utils/types.js";

const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
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

const addGroupToUser = async (req: IUserRequest, res: Response) => {
  const { id: groupId } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $push: { groups: new Types.ObjectId(groupId) } },
      { new: true }
    );
    if (!updatedUser) return res.sendStatus(404);
    res.json(updatedUser);
  } catch (error) {
    (error as ErrorType).code = 500;
    return res.send(error);
  }
};

const addErrorToUser = async (req: Request, res: Response) => {
  const { errorType, errorMessage, errorComment, date } = req.body;
  try {
    const newStudentError = await StudentError.create({
      errorType,
      errorMessage,
      errorComment,
      date,
    });
    if (!newStudentError) return res.sendStatus(404);
    const { id: userId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { studentErrors: newStudentError.id } },
      { new: true }
    );
    if (!updatedUser) return res.sendStatus(404);
    return res.json(updatedUser);
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

const getAllUsersGroups = async (req: IUserRequest, res: Response) => {
  try {
    const groups = await User.findById(req.userId)
      .populate("groups")
      .select("groups");
    res.json(groups);
  } catch (error) {
    res.status(404);
    return res.send(error);
  }
};

export {
  getUsers,
  getOneUserById,
  addGroupToUser,
  addErrorToUser,
  getAllTeachers,
  deleteUser,
  getAllUsersGroups,
};
