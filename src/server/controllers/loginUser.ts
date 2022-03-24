import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import getDebug from "debug";
import chalk from "chalk";
import User from "../../database/models/user.js";
import { ErrorType } from "../../utils/types.js";
import sendConfirmationEmail from "./sendConfirmationEmail.js";

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

export { loginUser, verifyUser, sendConfirmEmailOneMoreTime };
