import mongoose from "mongoose";
const { model, Schema } = mongoose;

interface StudentErrorSchemaTypes {
  errorType: string;
  errorMessage: string;
  errorComment: string;
  date?: string;
}

const studentErrorSchema = new Schema({
  errorType: {
    type: String,
    required: true,
  },

  errorMessage: {
    type: String,
    required: true,
  },

  errorComment: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: new Date(),
  },
});

const StudentError = model<StudentErrorSchemaTypes>(
  "Error",
  studentErrorSchema,
  "Errors"
);

export default StudentError;
