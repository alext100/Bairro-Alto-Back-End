import { NextFunction, Response } from "express";
import sharp from "sharp";
import { IUserRequest } from "../../utils/types.js";

const sharpImages = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.files) {
    return next();
  }

  req.body.images = [];
  await Promise.all(
    req.files.map(async (file: any, index: number) => {
      const fileName = file.filename.split(".")[0];
      const newFile = await sharp(file.path)
        .toFormat("webp")
        .withMetadata()
        .toFile(`images/${fileName}.webp`);
      req.body.images.push(`${fileName}.webp`);
      req.files[index].path = `images/${fileName}.webp`;
      req.files[index].filename = `${fileName}.webp`;
      req.files[index].size = newFile.size;
      req.files[index].mimetype = newFile.format;
    })
  );
  next();
};

export default sharpImages;
