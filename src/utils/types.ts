import mongoose from "mongoose";
import * as express from "express";
import { SendMailOptions } from "nodemailer";

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

export interface IUserRequest extends express.Request {
  groupId?: any;
  userId?: any;
  images?: any;
  files?: any;
  file?: any;
}

export interface ISendMailOptions extends SendMailOptions {
  template?: string;
  context?: {
    [name: string]: any;
  };
}
