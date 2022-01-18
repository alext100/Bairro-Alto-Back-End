import { mockRequest, mockResponse } from "../../utils/mocks";
import firebase from "./firebase";

describe("Given a firebase function", () => {
  const res = mockResponse();
  let req = mockRequest();
  describe("When it receives an object req with files", () => {
    test("Then it should add a property images in req and invoke next", async () => {
      req.files = [];
      const next = jest.fn();

      await firebase(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req).toHaveProperty("images");
    });
  });
  describe("When it receives an empty request", () => {
    test("Then it should invoke next without modifying the request", async () => {
      const next = jest.fn();

      await firebase(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
