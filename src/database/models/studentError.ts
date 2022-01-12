import { model, Schema } from "mongoose";

interface StudentErrorSchemaTypes {
  errorType: string;
  errorMessage: string;
  errorComment: string;
  date?: string;
}

const studentErrorSchema: Schema<StudentErrorSchemaTypes> = new Schema({
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
