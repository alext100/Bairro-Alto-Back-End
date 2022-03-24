import mongoose from "mongoose";

const { model, Schema, Types } = mongoose;

interface UserSchemaTypes {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  adminAccess: boolean;
  teacherAccess: boolean;
  studentAccess: boolean;
  groups: Array<object>;
  teacherGroups: Array<object>;
  studentGroups: Array<object>;
  image: string;
  homeworkToCheck?: Array<object>;
  info?: Array<object>;
  status?: string;
  confirmationCode?: string;
}

const userSchema = new Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
  },
  adminAccess: {
    type: Boolean,
    default: false,
  },
  teacherAccess: {
    type: Boolean,
    default: false,
  },
  studentAccess: {
    type: Boolean,
    default: true,
  },
  groups: [
    {
      type: [Types.ObjectId],
      ref: "Group",
    },
  ],
  teacherGroups: [
    {
      type: [Types.ObjectId],
      ref: "Group",
    },
  ],
  studentGroups: [
    {
      type: [Types.ObjectId],
      ref: "Group",
    },
  ],

  homeworkToCheck: [
    {
      type: [Types.ObjectId],
      ref: "Homework",
    },
  ],
  info: [
    {
      type: Object,
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
});

const User = model<UserSchemaTypes>("User", userSchema, "Users");

export default User;
