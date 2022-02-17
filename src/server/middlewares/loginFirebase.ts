import bcrypt from "bcrypt";

import { Request, Response, NextFunction } from "express";
import getDebug from "debug";
import chalk from "chalk";
import admin from "firebase-admin";
import User from "../../database/models/user.js";
import { ErrorType } from "../../utils/types.js";

const debug = getDebug("bairro:login");
debug.enabled = true;

const loginFirebase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error: ErrorType = new Error("Wrong credentials");
    error.code = 401;
    next(error);
  } else {
    debug(chalk.green("An user is logged in"));
    const rightPassword = await bcrypt.compare(password, user.password);
    if (!rightPassword) {
      const error: ErrorType = new Error("Wrong credentials");
      error.code = 401;
      next(error);
    } else {
      const uid = user.id;
      admin
        .auth()
        .createCustomToken(uid)
        .then((customToken) => {
          res.send({ customToken });
        })
        .catch((error) => {
          next(error);
        });
    }
  }
};

export default loginFirebase;
