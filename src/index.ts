/* eslint-disable import/first */
import dotenv from "dotenv";
import { initializeServer } from "./server/index.js";

import initializeMongo from "./database/index.js";
import { ConnectionStringType, PortType } from "./utils/types.js";

dotenv.config();

const port: PortType = process.env.PORT ?? process.env.SERVER_PORT ?? 5000;
const mongodbString: ConnectionStringType = process.env
  .MONGODB_STRING as string;

(async () => {
  try {
    await initializeMongo(mongodbString);
    await initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
