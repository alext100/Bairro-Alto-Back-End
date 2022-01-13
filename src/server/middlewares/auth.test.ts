import jwt from "jsonwebtoken";
import { mockResponse } from "../../utils/mocks";
import { ErrorType } from "../../utils/types";
import auth from "./auth";

jest.mock("jsonwebtoken");

describe("Given an auth function", () => {
  describe("When it receives request with no authorization", () => {
    test("Then it should invoke next function with an error 401 and a message 'Authorization error'", () => {
      const req: any = {
        header: jest.fn(),
      };
      const error: ErrorType = new Error("Authorization error");
      error.code = 401;
      const next = jest.fn();
      const res: any = jest.fn().mockResolvedValue({});

      auth(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
    });
  });

  describe("When it receives a request with a bad token", () => {
    test("Then it should invoke next function with an error 401 and a message", () => {
      const req: any = {
        header: jest
          .fn()
          .mockReturnValue("Bearer eyJhbsdrfgrareJIUzI1NiIsInR5cCI6IkpXVCJ9"),
      };
      jwt.verify = jest.fn().mockReturnValue(null);
      const next = jest.fn();
      const res = mockResponse();

      auth(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
      expect(next.mock.calls[0][0]).toHaveProperty("message", "Verify error");
    });
  });

  describe("When it receives a request with a correct token", () => {
    test("Then it should invoke a next function", () => {
      const req: any = {
        header: jest.fn(),
      };
      const next = jest.fn();
      jwt.verify = jest.fn().mockReturnValue(true);
      const res: any = jest.fn().mockResolvedValue({});

      auth(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a request with Authorization header but with no token", () => {
    test("Then it should invoke next function with an error.code = 401 and a message 'Token is incorrect'", () => {
      const req: any = {
        header: jest.fn().mockReturnValue("Bearer"),
      };
      const next = jest.fn();
      jwt.verify = jest.fn().mockReturnValue(false);
      const res: any = jest.fn().mockResolvedValue({});

      auth(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Token is incorrect"
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
    });
  });
});
