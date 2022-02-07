import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Response } from "express";
import { ErrorType, IUserRequest } from "../../utils/types.js";

dotenv.config();

const secretHash = process.env.SECRET_HASH as string;

const auth = (req: IUserRequest, res: Response, next: NextFunction) => {
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
        next();
      } catch {
        const error: ErrorType = new Error("Verify error");
        error.code = 401;
        next(error);
      }
    }
  }
};

export default auth;
