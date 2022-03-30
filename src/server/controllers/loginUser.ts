import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import getDebug from "debug";
import chalk from "chalk";
import User from "../../database/models/user.js";
import { ErrorType } from "../../utils/types.js";
import sendEmail from "../lib/sendEmail.js";

const debug = getDebug("bairro:login");
debug.enabled = true;

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const secretHash: string = process.env.SECRET_HASH as string;
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error: ErrorType = new Error("Wrong credentials");
    error.code = 401;
    next(error);
  } else {
    debug(chalk.green("An user is logging in"));
    const rightPassword = await bcrypt.compare(password, user.password);
    if (!rightPassword) {
      debug(chalk.red("Wrong password"));
      const error: ErrorType = new Error("Wrong credentials");
      error.code = 401;
      next(error);
    } else if (user.status !== "Active") {
      debug(chalk.red("Not active"));
      const error: ErrorType = new Error("Invalid token specified");
      error.code = 401;
      return res.send(error);
    } else if (user.status === "Active") {
      debug(chalk.red("Is active, logged in"));
      const token = jwt.sign({ email, id: user.id }, secretHash, {
        expiresIn: 72 * 60 * 60,
      });
      res.json({ token });
    }
  }
};

const verifyUser = async (req: Request, res: Response) => {
  await User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      user.status = "Active";
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
        }
      });
    })
    .catch((error) => {
      (error as ErrorType).code = 500;
      return res.send(error);
    });
};

const sendConfirmEmailOneMoreTime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  if (!user) {
    const error: ErrorType = new Error("Wrong email");
    error.code = 401;
    next(error);
  } else if (user.status !== "Active") {
    debug(chalk.red("Not active, sending one more email with code"));
    const mail = [
      user.email,
      "Повторное письмо для активации аккаунта",
      `Чтобы подтвердить почтовый адрес и активировать аккаунт, перейдите по ссылке: https://bairro-alto.web.app/confirm/${user.confirmationCode}`,
      "confirmation",
      {
        name: user.firstName,
        confirmationCode: user.confirmationCode,
      },
    ] as const;
    sendEmail(...mail);
    return res.status(200);
  }
};

const changePassword = async (req: Request, res: Response) => {
  const user = req.body;
  const secretHash: string = process.env.GOOGLE_MAIL_SECRET_HASH as string;
  const token = jwt.sign({ email: req.body.email }, secretHash);
  const userToUpdate = {
    password: await bcrypt.hash(user.password, 10),
    confirmationCode: token,
    status: "Pending",
  };
  try {
    const updatedUser = await User.findByIdAndUpdate(user.id, userToUpdate, {
      new: true,
    });
    if (!updatedUser) return res.sendStatus(404);
    const mail = [
      user.email,
      "Смена пароля",
      `Чтобы сменить пароль, перейдите по ссылке: https://bairro-alto.web.app/confirm/${user.confirmationCode}`,
      "confirmation",
      {
        name: updatedUser.firstName,
        confirmationCode: updatedUser.confirmationCode,
      },
    ] as const;
    sendEmail(...mail);
    return res.status(201).json(updatedUser);
  } catch (error) {
    (error as ErrorType).code = 400;
    (error as ErrorType).message = "Bad credentials provided";
    return res.send(error);
  }
};

export { loginUser, verifyUser, sendConfirmEmailOneMoreTime, changePassword };
