import getDebug from "debug";
import chalk from "chalk";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { ErrorType, PortType } from "../utils/types.js";

import userRoutes from "./routes/userRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import errorRoutes from "./routes/errorRoutes.js";
import {
  generalErrorHandler,
  notFoundErrorHandler,
} from "./middlewares/error.js";

const debug = getDebug("bairro:server");
debug.enabled = true;

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

export const initializeServer = (port: PortType) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Server is listening on port number: ${port}`));
      resolve(server);
    });

    server.on("error", (error: ErrorType) => {
      debug(chalk.red("There was an error starting the server"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`The port ${port} is in use.`));
      }
      reject();
    });

    server.on("close", () => {
      debug(chalk.yellow("Server express disconnected"));
    });
  });

app.use("/user", userRoutes);
app.use("/group", groupRoutes);
app.use("/lesson", lessonRoutes);
app.use("/error", errorRoutes);

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

export default { app };
