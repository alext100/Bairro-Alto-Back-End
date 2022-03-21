import mongoose from "mongoose";

const { model, Schema, Types } = mongoose;

interface LessonSchemaTypes {
  author: object;
  title: string;
  body: string;
  lessonDescription?: string;
  level: string;
  videos?: Array<string>;
  audios?: Array<string>;
  date?: string;
  info?: Array<object>;
  courseName?: string;
}

const LessonSchema = new Schema({
  author: {
    type: [Types.ObjectId],
    required: true,
  },
  title: {
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
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  info: [
    {
      type: Object,
    },
  ],
  courseName: {
    type: String,
    required: false,
  },
});

const Lesson = model<LessonSchemaTypes>("Lesson", LessonSchema, "Lessons");

export default Lesson;
