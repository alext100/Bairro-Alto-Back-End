import mongoose from "mongoose";
const { model, Schema, Types } = mongoose;

interface GroupSchemaTypes {
  name: string;
  members: Array<object>;
  homeworkToDo: object;
  lessons: Array<object>;
  groupErrors: Array<object>;
}

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
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
});

const Group = model<GroupSchemaTypes>("Group", groupSchema, "Groups");

export default Group;
