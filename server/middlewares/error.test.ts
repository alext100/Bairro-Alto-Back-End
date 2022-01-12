import { ValidationError } from "express-validation";
import { mockRequest, mockResponse } from "../../utils/mocks.js";
import { generalErrorHandler, notFoundErrorHandler } from "./error";

export default interface IError extends ValidationError {
  code: number;
}
export interface ResponseTestTypes {
  status: () => void;
  json: () => void;
}

describe("Given a notFoundErrorHandler function", () => {
  describe("When an endpoint is not found ", () => {
    test("Then it should invoke the method json with a status 404 and an error message", () => {
      const errorStatus = 404;
      const errorMessage = "Endpoint not found";
      const error = {
        error: errorMessage,
      };

      const res = mockResponse();
      const req = mockRequest();

      notFoundErrorHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(errorStatus);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a generalErrorHandler", () => {
  describe("When it receives a error", () => {
    test("Then it should invoke the method json with the error message and the method status with 500", () => {
      const errorCode = 500;
      const errorMessage = "General error";
      const error = {
        error: errorMessage,
      };

      const res = mockResponse();
      const req = mockRequest();
      const next = () => {};

      generalErrorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(errorCode);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });

  describe("When it gets a Validation error", () => {
    test("Then it should invoke res.status with 500 and res.json with error", async () => {
      const res = mockResponse();
      const req = mockRequest();
      const error = new Error("Error") as IError;
      error.statusCode = 500;

      const next = () => {};

      await generalErrorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(error.statusCode);
    });
  });
});
