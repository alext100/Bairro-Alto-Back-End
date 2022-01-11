import mongoose from "mongoose";

export type ErrorType = {
  code?: string | number;
  message: string;
};

export type PortType = number | string;

export type ConnectionStringType = string;

export type TransformTypes = {
  doc: object;
  ret: object;
  _id?: typeof mongoose.Schema.Types.String;
  __v?: typeof mongoose.Schema.Types.String;
};
