import { Request, Response } from "express";
import { IUserRequest } from "./types.js";

export const mockRequest = () => {
  const req = {} as IUserRequest;
  return req;
};
export const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();

  return res;
};
