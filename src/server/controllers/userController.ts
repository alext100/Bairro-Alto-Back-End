import { NextFunction, Request, Response } from "express";
import User from "../../database/models/user.js";
import { ErrorType } from "../../utils/types.js";

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

export { getUsers, getOneUserById };
