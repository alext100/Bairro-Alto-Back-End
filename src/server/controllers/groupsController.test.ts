import { Request } from "express";
import Group from "../../database/models/group";
import { mockRequest, mockResponse } from "../../utils/mocks";
import { getRandomGroup, getRandomGroups } from "../../utils/factory";
import {
  addMemberToGroup,
  createGroup,
  deleteGroup,
  getAllGroups,
  getOneGroupById,
  updateGroupById,
} from "./groupsController";
import { ErrorType } from "../../utils/types";

describe("Given a getAllGroups function", () => {
  describe("When it receives a request and response", () => {
    test("Then it should invoke res.json with an array of users", async () => {
      const res = mockResponse();
      const req = mockRequest();

      const expectedGroups = await getRandomGroups(3);
      Group.find = jest.fn().mockResolvedValue(expectedGroups);
      await getAllGroups(req, res);

      expect(res.json).toHaveBeenLastCalledWith(expectedGroups);
    });
  });
});

describe("Given a createGroup function", () => {
  describe("When it receives a request with the group", () => {
    test("Then it should invoke the method json with the group and method status 201", async () => {
      const group = getRandomGroup();
      const req = {
        body: group,
      } as Request;
      const res = mockResponse();
      const next = jest.fn().mockResolvedValue(null);
      const expectedStatus = 201;

      Group.create = jest.fn().mockResolvedValue(group);
      await createGroup(req, res, next);

      expect(res.json).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a request with error", () => {
    test("Then it should invoke the next function with error message and status 400", async () => {
      const group = getRandomGroup();
      const error: ErrorType = new Error("Error on create group");
      const req = {
        body: group,
      } as Request;
      const next = jest.fn();
      const res = mockResponse();

      Group.create = jest.fn().mockRejectedValue(error);
      await createGroup(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error.code).toBe(400);
    });
  });
});

describe("Given getOneGroupById function", () => {
  describe("When it receives a request with id 619f6070a4f80ab3d6555ebb, a res object and a next function", () => {
    test("Then it should invoke Group.findById with that id", async () => {
      Group.findById = jest.fn().mockResolvedValue({});
      const id = "619f6070a4f80ab3d6555ebb";
      const req = mockRequest();
      req.params = {
        id,
      };
      const res = mockResponse();
      const next = () => {};

      await getOneGroupById(req, res, next);

      expect(Group.findById).toHaveBeenCalledWith(id);
    });
  });

  describe("And getOneGroupById.findById rejects", () => {
    test("Then it should invoke next function with the error rejected", async () => {
      const id = "0";
      const error = {};
      Group.findById = jest.fn().mockRejectedValue(error);
      const req = mockRequest();
      req.params = {
        id,
      };

      const res = mockResponse();
      const next = jest.fn();

      await getOneGroupById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("And Group.findById resolves to group", () => {
    test("Then it should invoke res.json with group", async () => {
      const id = "619f6070a4f80ab3d6555ebb";
      const group = getRandomGroup();
      Group.findById = jest.fn().mockResolvedValue(group);
      const req = mockRequest();
      req.params = {
        id,
      };

      const res = mockResponse();
      const next = jest.fn();

      await getOneGroupById(req, res, next);

      expect(res.json).toHaveBeenCalledWith(group);
    });
  });
  describe("And Group.findById will not find a group", () => {
    test("Then it should invoke next function with error message and code 404", async () => {
      const req = mockRequest();
      req.params = {
        id: "some id that do not exist",
      };
      const res = mockResponse();
      const next = jest.fn();
      Group.findById = jest.fn().mockResolvedValue(null);

      await getOneGroupById(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given updateGroupById function", () => {
  const req = mockRequest();
  const res = mockResponse();
  const updatedGroup = getRandomGroup();
  beforeEach(() => {
    req.params = {
      id: "619f6070a4f80ab3d6555ebb",
    };
    req.body = updatedGroup;

    res.send = jest.fn();
    res.sendStatus = jest.fn();
  });

  describe("When it receives a correct group id and a group", () => {
    test("Then it should invoke Group.findByIdAndUpdate with that group", async () => {
      Group.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedGroup);
      await updateGroupById(req, res);

      expect(res.json).toHaveBeenCalledWith(updatedGroup);
    });
  });

  describe("When it receives a non existent group", () => {
    test("Then it should invoke res.sendStatus with 404 error.code", async () => {
      Group.findByIdAndUpdate = jest.fn().mockResolvedValue(undefined);
      await updateGroupById(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("When it rejected", () => {
    test("Then it should invoke res.status with error.code 500", async () => {
      const error = new Error("Error");
      Group.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
      await updateGroupById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});

describe("Given deleteGroup function", () => {
  const req = mockRequest();
  const res = mockResponse();
  req.params = {
    id: "619f6070a4f80ab3d6555ebb",
  };

  describe("When it receives an id", () => {
    test("Then it should invoke res.json with code 200", async () => {
      Group.findByIdAndDelete = jest.fn().mockResolvedValue({});
      await deleteGroup(req, res);

      expect(res.json).toHaveBeenCalledWith(200);
    });
  });

  describe("When it rejects with error", () => {
    test("Then it should invoke res.send with that error", async () => {
      const error = new Error();
      res.send = jest.fn();

      Group.findByIdAndDelete = jest.fn().mockRejectedValue(error);
      await deleteGroup(req, res);

      expect(res.send).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given addGroupToAnyUser controller", () => {
  const req = mockRequest();
  const res = mockResponse();
  describe("When it receives request with UserID and groupId", () => {
    test("Then it should invoke res.json with updatedUser", async () => {
      req.params = {
        id: "619e4af28ba856f6b657e46f",
      };
      req.body = { id: "619e4af28ba856f6b657e46f" };
      req.userId = "619e4af28ba856f6b657e46f";
      const updatedUser = { id: "619e4af28ba856f6b657e46f" };

      Group.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedUser);

      await addMemberToGroup(req, res);

      expect(res.json).toHaveBeenCalledWith(updatedUser.id);
    });
  });

  describe("When it rejects", () => {
    test("Then it should invoke res.json with 404", async () => {
      Group.findByIdAndUpdate = jest.fn().mockResolvedValue(undefined);
      res.sendStatus = jest.fn();

      await addMemberToGroup(req, res);

      expect(res.sendStatus).toHaveBeenCalled();
    });
  });

  describe("When it rejects with error", () => {
    test("Then it should invoke res.send with error", async () => {
      const error = new Error();
      res.send = jest.fn();

      Group.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
      await addMemberToGroup(req, res);

      expect(res.send).toHaveBeenCalledWith(error);
    });
  });
});
