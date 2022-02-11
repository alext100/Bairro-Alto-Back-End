import mongoose from "mongoose";

const { model, Schema, Types } = mongoose;

interface GroupSchemaTypes {
  groupName: string;
  members: Array<object>;
  teachers: Array<object>;
  homeworkToDo: object;
  lessons: Array<object>;
  groupErrors: Array<object>;
  info?: Array<object>;
}

const groupSchema = new Schema({
  groupName: {
    type: String,
    required: true,
    unique: true,
  },
  members: [
    {
      type: [Types.ObjectId],
      ref: "User",
      unique: true,
    },
  ],
  teachers: [
    {
      type: [Types.ObjectId],
      ref: "User",
      unique: true,
    },
  ],
  homeworkToDo: [
    {
      type: Object,
    },
  ],
  lessons: [
    {
      type: [Types.ObjectId],
      ref: "Lesson",
      unique: true,
    },
  ],
  groupErrors: [
    {
      type: [Types.ObjectId],
      ref: "Error",
    },
  ],
  info: [
    {
      type: Object,
    },
  ],
});

const Group = model<GroupSchemaTypes>("Group", groupSchema, "Groups");

export default Group;
