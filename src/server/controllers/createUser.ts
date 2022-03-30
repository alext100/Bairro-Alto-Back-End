import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../database/models/user.js";
import { ErrorType } from "../../utils/types.js";
import sendEmail from "../lib/sendEmail.js";

dotenv.config();

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const secretHash: string = process.env.GOOGLE_MAIL_SECRET_HASH as string;
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
    status,
  } = req.body;

  const token = jwt.sign({ email: req.body.email }, secretHash);
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
      status,
      confirmationCode: token,
    });
    res.status(201).json(user);
    const mail = [
      user.email,
      "Активация аккаунта",
      `Чтобы подтвердить почтовый адрес и активировать аккаунт, перейдите по ссылке: https://bairro-alto.web.app/confirm/${user.confirmationCode}`,
      "confirmation",
      {
        name: user.firstName,
        confirmationCode: user.confirmationCode,
      },
    ] as const;
    sendEmail(...mail);
  } catch {
    const error: ErrorType = new Error("Bad credentials provided");
    error.code = 400;
    next(error);
  }
};

export default createUser;
