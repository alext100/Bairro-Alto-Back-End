import multer from "multer";
import path from "path";

const uploadAudio = multer({
  storage: multer.diskStorage({
    destination: "audio",

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
  limits: { fileSize: 33554432 },
});

export default uploadAudio;
