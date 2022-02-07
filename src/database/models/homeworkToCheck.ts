import mongoose from "mongoose";

const { model, Schema } = mongoose;

interface HomeworkToCheckSchemaTypes {
  text: string;
  audio?: Array<string>;
  video?: Array<string>;
  image?: Array<string>;
  date?: string;
  info?: Array<string>;
}

const HomeworkToCheckSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  audio: [
    {
      type: String,
      required: false,
    },
  ],
  video: [
    {
      type: String,
      required: false,
    },
  ],
  image: [
    {
      type: String,
      required: false,
    },
  ],
  date: {
    type: Date,
    default: new Date(),
  },
  info: [
    {
      type: Object,
    },
  ],
});

const HomeworkToCheck = model<HomeworkToCheckSchemaTypes>(
  "HomeworkToCheck",
  HomeworkToCheckSchema,
  "HomeworksToCheck"
);

export default HomeworkToCheck;
