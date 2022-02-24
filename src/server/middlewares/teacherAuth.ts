import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../database/models/user";
import { ErrorType, IUserRequest } from "../../utils/types";

dotenv.config();

const secretHash = process.env.SECRET_HASH as string;

const teacherAuth = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    const error: ErrorType = new Error("Authorization error");
    error.code = 401;
    next(error);
  } else {
    const token = authHeader.split(" ")[1];
    if (!token) {
      const error: ErrorType = new Error("Token is incorrect");
      error.code = 401;
      next(error);
    } else {
      try {
        const user = jwt.verify(token, secretHash) as any;
        req.userId = user.id;
        const userFromDB = await User.findById(req.userId).select(
          "teacherAccess"
        );
        if (userFromDB?.teacherAccess === true) {
          next();
        } else {
          const error: ErrorType = new Error(
            "You are not allowed for this operation"
          );
          error.code = 403;
          next(error);
        }
      } catch {
        const error: ErrorType = new Error("Verify error");
        error.code = 401;
        next(error);
      }
    }
  }
};

export default teacherAuth;
