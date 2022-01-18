import dotenv from "dotenv";
import admin from "firebase-admin";
import chalk from "chalk";
import getDebug from "debug";
import { NextFunction, Response } from "express";
import { ErrorType, IUserRequest } from "../../utils/types.js";

dotenv.config();
const debug = getDebug("bairro:firebase");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: process.env.FIREBASE,
});

const firebase = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const bucket = admin.storage().bucket();
  try {
    req.images = [];
    const getImages = req.files.map(async (image: any) => {
      await bucket.upload(image.path);
      await bucket.file(image.filename).makePublic();
      return bucket.file(image.filename).publicUrl();
    });

    const images = await Promise.all(getImages);
    req.images = images;
    debug(chalk.green(`A total of ${images.length} images have been uploaded`));
    next();
  } catch (error) {
    (error as ErrorType).code = 400;
    (error as ErrorType).message = "There has been an error with firebase";
    next();
  }
};

export default firebase;
