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
  image: string;
  homeworkToCheck: Array<object>;
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
  homeworkToCheck: [
    {
      type: [Types.ObjectId],
      ref: "Homework",
    },
  ],
});

const User = model<UserSchemaTypes>("User", userSchema, "Users");

export default User;
