import getDebug from "debug";
import chalk from "chalk";
import mongoose from "mongoose";
import { ConnectionStringType, TransformTypes } from "../utils/types";

const debug = getDebug("bairro:database");
debug.enabled = true;

const initializeMongo = (connectionString: ConnectionStringType) =>
  new Promise<void>((resolve, reject) => {
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc: TransformTypes, ret: TransformTypes) => {
        // eslint-disable-next-line no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle
        delete ret.__v;
      },
    });
    mongoose.set("debug", true);
    mongoose.connect(
      connectionString,
      {
        autoIndex: true,
      },
      (error) => {
        if (error) {
          debug(chalk.red("Failed connection with the database"));
          debug(chalk.red(error.message));
          reject();
          return;
        }
        debug(chalk.greenBright(`Connected with the database `));
        resolve();
      }
    );
  });

export default initializeMongo;
