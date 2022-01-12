import { model, Schema, Types } from "mongoose";

interface LessonSchemaTypes {
  author: object;
  lessonName: string;
  lessonDescription?: string;
  level: string;
  lessonImage?: string;
  videos?: Array<string>;
  audios?: Array<string>;
  text: string;
  date?: string;
}

const LessonSchema: Schema<LessonSchemaTypes> = new Schema({
  author: {
    type: [Types.ObjectId],
    required: true,
  },
  lessonName: {
    type: String,
    required: true,
  },
  lessonDescription: {
    type: String,
    required: false,
  },
  level: {
    type: String,
    required: true,
  },
  lessonImage: {
    type: String,
    required: false,
  },
  videos: [
    {
      type: String,
      required: false,
    },
  ],
  audios: [
    {
      type: String,
      required: false,
    },
  ],
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Lesson = model<LessonSchemaTypes>("Lesson", LessonSchema, "Lessons");

export default Lesson;
