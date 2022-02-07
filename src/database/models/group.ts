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
    },
  ],
  teachers: [
    {
      type: [Types.ObjectId],
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
      type: [Types.ObjectId],
      ref: "Lesson",
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
