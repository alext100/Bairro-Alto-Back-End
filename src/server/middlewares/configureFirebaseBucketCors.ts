import { Storage } from "@google-cloud/storage";
import getDebug from "debug";
import chalk from "chalk";
import { NextFunction, Response, Request } from "express";

const debug = getDebug("bairro:setFirebaseCors");
debug.enabled = true;

const storage = new Storage();
const bucketName = "bairro-alto.appspot.com";
const origin = [
  "http://localhost/",
  "http://localhost:8080/",
  "https://bairro-alto.netlify.app/",
  "https://bairro-alto.web.app/",
];
const responseHeader = "Content-Type";
const maxAgeSeconds = 3600;
const method = "GET";

const configureFirebaseBucketCors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await storage.bucket(bucketName).setCorsConfiguration([
      {
        maxAgeSeconds,
        method: [method],
        origin,
        responseHeader: [responseHeader],
      },
    ]);

    debug(
      `Bucket ${chalk.green(bucketName)} was updated with a CORS config 
      to allow ${chalk.green(method)} requests from ${chalk.green(origin)} 
      sharing  ${chalk.green(responseHeader)} responses across origins`
    );
    next();
  } catch (error) {
    debug(
      chalk.red(
        `Error ${chalk.blue(error)} on setting CORS origin 
        for ${chalk.blue(bucketName)}`
      )
    );
    next(error);
  }
};

export default configureFirebaseBucketCors;
