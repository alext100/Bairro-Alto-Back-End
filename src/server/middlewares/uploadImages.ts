import multer from "multer";
import path from "path";

const uploadImages = multer({
  storage: multer.diskStorage({
    destination: "images",

    filename: (req, file, callback) => {
      const oldFilename = file.originalname;
      const oldFilenameExtension = path.extname(oldFilename);
      const oldFilenameWithoutExtension = oldFilename.replace(
        oldFilenameExtension,
        ""
      );

      const newFilename = `${oldFilenameWithoutExtension}-${Date.now()}${oldFilenameExtension}`;
      callback(null, newFilename);
    },
  }),
  limits: { fileSize: 4194304 },
});

export default uploadImages;
