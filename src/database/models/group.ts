import { model, Schema, Types } from "mongoose";

interface GroupSchemaTypes {
  name: string;
  members: Array<object>;
  homeworkToDo: object;
  lessons: Array<object>;
}

const groupSchema: Schema<GroupSchemaTypes> = new Schema({
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
});

const Group = model<GroupSchemaTypes>("Group", groupSchema, "Groups");

export default Group;