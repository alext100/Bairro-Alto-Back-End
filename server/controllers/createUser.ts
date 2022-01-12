import { Request, Response, NextFunction } from "express";

import bcrypt from "bcrypt";
import User from "../../database/models/user.js";
import { ErrorType } from "../../utils/types.js";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    email,
    password,
    firstName,
    lastName,
    image,
    professorAccess,
    adminAccess,
    teacherAccess,
    groups,
    studentErrors,
    homeworkToCheck,
  } = req.body;
  try {
    const user = await User.create({
      email,
      firstName,
      lastName,
      image,
      professorAccess,
      adminAccess,
      teacherAccess,
      groups,
      studentErrors,
      homeworkToCheck,
      password: await bcrypt.hash(password, 10),
    });
    res.status(201).json(user);
  } catch {
    const error: ErrorType = new Error("Bad credentials provided");
    error.code = 400;
    next(error);
  }
};

export default createUser;
