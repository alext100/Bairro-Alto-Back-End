import mongoose, { type Types, type Document } from "mongoose";

const { Schema, model } = mongoose;

interface IGroup extends Document {
  groupName: string;
  members: Types.ObjectId[];
  teachers: Types.ObjectId[];
  homeworkToDo: object[];
  lessons: Types.ObjectId[];
  groupErrors: Types.ObjectId[];
  info?: object[];
}

const groupSchema = new Schema<IGroup>({
  groupName: {
    type: String,
    required: true,
    unique: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: false,
      required: false,
    },
  ],
  teachers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  homeworkToDo: [
    {
      type: Object,
    },
  ],
  lessons: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
  groupErrors: [
    {
      type: Schema.Types.ObjectId,
      ref: "Error",
    },
  ],
  info: [
    {
      type: Object,
    },
  ],
});

const Group = model<IGroup>("Group", groupSchema, "Groups");

export default Group;
