import StudentError from "../../database/models/studentError";
import { mockRequest, mockResponse } from "../../utils/mocks";
import { getRandomError, getRandomUser } from "../../utils/factory";
import {
  addErrorToGroup,
  deleteErrorFromGroup,
  getAllGroupErrors,
  updateGroupError,
} from "./errorsController";
import Group from "../../database/models/group";

jest.mock("../../database/models/user");

describe("Given deleteErrorFromGroup controller", () => {
  const req = mockRequest();
  const res = mockResponse();
  describe("When it receives request with groupID", () => {
    test("Then it should invoke res.json with updatedGroup", async () => {
      req.params = {
        id: "619s6070a4s80ab3s6545ess",
      };
      req.body = { id: "619s6070a4s80ab3s6545ess" };
      req.groupId = "619s6070a4s80ab3s6545ess";
      const updatedGroup = { id: "619s6070a4s80ab3s6545ess" };

      Group.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedGroup);

      await deleteErrorFromGroup(req, res);

      expect(res.json).toHaveBeenCalledWith(updatedGroup.id);
    });
  });

  describe("When it rejects", () => {
    test("Then it should invoke res.json with 404", async () => {
      Group.findByIdAndUpdate = jest.fn().mockResolvedValue(undefined);
      res.sendStatus = jest.fn();

      await deleteErrorFromGroup(req, res);

      expect(res.sendStatus).toHaveBeenCalled();
    });
  });

  describe("When it rejects with error", () => {
    test("Then it should invoke res.send with error", async () => {
      const error = new Error();
      res.send = jest.fn();
      req.groupId = "619s6070a4s80ab3s6545ess";

      Group.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
      await deleteErrorFromGroup(req, res);

      expect(res.send).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given updateGroupError function", () => {
  const req = mockRequest();
  const res = mockResponse();
  const updatedError = getRandomError();
  beforeEach(() => {
    req.params = {
      id: "619f6070a4aewrb3d6555etr",
    };
    req.body = updatedError;

    res.send = jest.fn();
    res.sendStatus = jest.fn();
  });

  describe("When it receives a correct studentError id and a studentError", () => {
    test("Then it should invoke studentError.findByIdAndUpdate with that studentError", async () => {
      StudentError.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue(updatedError);
      await updateGroupError(req, res);

      expect(res.json).toHaveBeenCalledWith(updatedError);
    });
  });

  describe("When it receives a non existent studentError", () => {
    test("Then it should invoke res.sendStatus with 404 error.code", async () => {
      StudentError.findByIdAndUpdate = jest.fn().mockResolvedValue(undefined);
      await updateGroupError(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("When it rejected", () => {
    test("Then it should invoke res.status with error.code 500", async () => {
      const error = new Error("Error");
      StudentError.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
      await updateGroupError(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});

describe("Given getAllGroupErrors controller", () => {
  const req = mockRequest();
  const res = mockResponse();
  req.params = {
    id: "619s6070a4s80ab3s6545ess",
  };
  describe("When it receives request with UserID", () => {
    test("Then it should invoke res.json with groups", async () => {
      const errors = {};

      Group.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue(errors),
        }),
      });

      await getAllGroupErrors(req, res);

      expect(res.json).toHaveBeenCalledWith(errors);
    });
  });

  describe("When it rejects", () => {
    test("Then it should invoke res.status with 404", async () => {
      Group.findById = jest.fn().mockReturnValueOnce(undefined);
      res.send = jest.fn();

      await getAllGroupErrors(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});

describe("Given addErrorToGroup function", () => {
  const req = mockRequest();
  const res = mockResponse();

  describe("When it receives req with  errorType, errorMessage, errorComment and date ", () => {
    test("Then it should invoke res.json with updatedUser", async () => {
      req.params = {
        id: "6185c1ad9f1964f08e62d12f",
      };
      const studentError = {
        errorType: "Fallo",
        errorMessage: "qwerty",
        errorComment: "qwerty",
        date: "2021-11-26T14:37:39.951+00:00",
      };
      req.body = studentError;

      const updatedUser = getRandomUser();

      StudentError.create = jest.fn().mockResolvedValue(studentError);
      Group.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedUser);
      await addErrorToGroup(req, res);

      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });
  });

  describe("When it rejects with error", () => {
    test("Then it should invoke next with error", async () => {
      const error = new Error("User not found");
      res.send = jest.fn();

      Group.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
      await addErrorToGroup(req, res);

      expect(res.send).toHaveBeenCalledWith(error);
    });
  });

  describe("When user to update not found", () => {
    test("Then it should invoke res.sendStatus with 404", async () => {
      res.sendStatus = jest.fn();

      Group.findByIdAndUpdate = jest.fn().mockResolvedValue(undefined);
      await addErrorToGroup(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("When new StudentError not found", () => {
    test("Then it should invoke res.sendStatus with 404", async () => {
      res.sendStatus = jest.fn();

      StudentError.create = jest.fn().mockResolvedValue(undefined);
      await addErrorToGroup(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });
});
