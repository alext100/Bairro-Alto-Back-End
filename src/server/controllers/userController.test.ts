import { Request } from "express";
import User from "../../database/models/user";
import { mockRequest, mockResponse } from "../../utils/mocks";
import { getRandomUser, getRandomUsers } from "../../utils/factory";
import {
  addGroupToTeacher,
  deleteGroupFromUser,
  deleteUser,
  getAllTeachers,
  getAllTeachersGroups,
  getOneUserById,
  getUsers,
} from "./userController";

jest.mock("../../database/models/user");

describe("Given a getUsers function", () => {
  describe("When it receives a request and response", () => {
    test("Then it should invoke res.json with an array of users", async () => {
      const res = mockResponse();
      const req = mockRequest();

      const expectedUsers = await getRandomUsers(3);
      User.find = jest.fn().mockResolvedValue(expectedUsers);
      await getUsers(req, res);

      expect(res.json).toHaveBeenLastCalledWith(expectedUsers);
    });
  });
});

describe("Given getOneUserById function", () => {
  describe("When it receives a request with id that not exist, a res object and a next function", () => {
    test("Then it should invoke next function with error", async () => {
      User.findById = jest.fn().mockResolvedValue(null);
      const req = mockRequest();
      req.params = {
        id: "0",
      };
      const error = new Error("User not found");
      const res = mockResponse();
      const next = jest.fn();

      await getOneUserById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("And getOneUserById.findById rejects", () => {
    test("Then it should invoke next function with the error rejected", async () => {
      const error = {};
      User.findById = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          id: 0,
        },
      } as unknown as Request;
      const res = mockResponse();
      const next = jest.fn();

      await getOneUserById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("And User.findById resolves to user", () => {
    test("Then it should invoke res.json with user", async () => {
      const id = "6185c1ad9f1964f08e62d12f";
      const user = getRandomUser();
      User.findById = jest.fn().mockResolvedValue(user);
      const req = {
        params: {
          id,
        },
      } as unknown as Request;
      const res = mockResponse();
      const next = jest.fn();

      await getOneUserById(req, res, next);

      expect(res.json).toHaveBeenCalledWith(user);
    });
  });
});

describe("Given addGroupToUserController", () => {
  const req = mockRequest();
  const res = mockResponse();

  describe("When it receives req with groupId, and userId", () => {
    test("Then it should invoke res.json with 201", async () => {
      req.params = {
        id: "6185c1ad9f1964f08e62d12f",
      };
      const updatedUser = getRandomUser();

      User.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedUser);
      await addGroupToTeacher(req, res);

      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });
  });

  describe("When it rejects with error", () => {
    test("Then it should invoke next with error", async () => {
      const error = new Error("User not found");
      res.send = jest.fn();

      User.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
      await addGroupToTeacher(req, res);

      expect(res.send).toHaveBeenCalledWith(error);
    });
  });

  describe("When user to update not found", () => {
    test("Then it should invoke res.sendStatus with 404", async () => {
      res.sendStatus = jest.fn();

      User.findByIdAndUpdate = jest.fn().mockResolvedValue(undefined);
      await addGroupToTeacher(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });
});

describe("Given deleteUser function", () => {
  const req = mockRequest();
  const res = mockResponse();
  req.params = {
    id: "619s6070a4s80ab3s6545ess",
  };

  describe("When it receives an id", () => {
    test("Then it should invoke res.json with code 200", async () => {
      User.findByIdAndDelete = jest.fn().mockResolvedValue({});
      await deleteUser(req, res);

      expect(res.json).toHaveBeenCalledWith(200);
    });
  });

  describe("When it rejects with error", () => {
    test("Then it should invoke res.send with that error", async () => {
      const error = new Error();
      res.send = jest.fn();

      User.findByIdAndDelete = jest.fn().mockRejectedValue(error);
      await deleteUser(req, res);

      expect(res.send).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given getAllTeachers function", () => {
  describe("When it receives a request", () => {
    test("Then it should invoke res.json with teachers", async () => {
      const res = mockResponse();
      const req = mockRequest();

      const allUsers = [
        {
          password:
            "$2w$17$.csaVWRzFoZbhBtg4fyu4ikt4ryuDDaJlL3lmDczUuBto.H6j/P1NrmQp.",
          email: "alexssan0@gmail.com",
          firstName: "Alexsd",
          lastName: "Tusdfgrc",
          image:
            "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          adminAccess: false,
          teacherAccess: true,
          studentAccess: false,
          groups: [],
          studentErrors: [],
          homeworkToCheck: [],
          id: "61df3972ab6a9fda28a9022a",
        },
        {
          password:
            "$2w$17$.csaVWRzFoZbhBtg4fyu4ikt4ryuDDaJlL3lmDczUuBto.H6j/P1NrmQp.",
          email: "alexa0@gmail.com",
          firstName: "Alex",
          lastName: "Turc",
          image:
            "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          adminAccess: true,
          teacherAccess: false,
          studentAccess: false,
          groups: [],
          studentErrors: [],
          homeworkToCheck: [],
          id: "61df3972ab6a9fda28a9022a",
        },
      ];

      const teachersFiltredFromAllUsers = [
        {
          password:
            "$2w$17$.csaVWRzFoZbhBtg4fyu4ikt4ryuDDaJlL3lmDczUuBto.H6j/P1NrmQp.",
          email: "alexssan0@gmail.com",
          firstName: "Alexsd",
          lastName: "Tusdfgrc",
          image:
            "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          adminAccess: false,
          teacherAccess: true,
          studentAccess: false,
          groups: [],
          studentErrors: [],
          homeworkToCheck: [],
          id: "61df3972ab6a9fda28a9022a",
        },
      ];

      User.find = jest.fn().mockResolvedValue(allUsers);
      await getAllTeachers(req, res);

      expect(res.json).toHaveBeenCalledWith(teachersFiltredFromAllUsers);
    });
  });
});

describe("Given getAllUsersGroups controller", () => {
  const req = mockRequest();
  const res = mockResponse();
  describe("When it receives request with UserID", () => {
    test("Then it should invoke res.json with groups", async () => {
      const group = {};

      User.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue(group),
        }),
      });

      await getAllTeachersGroups(req, res);

      expect(res.json).toHaveBeenCalledWith(group);
    });
  });

  describe("When it rejects", () => {
    test("Then it should invoke res.status with 404", async () => {
      User.findById = jest.fn().mockReturnValueOnce(undefined);
      res.send = jest.fn();

      await getAllTeachersGroups(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});

describe("Given deleteGroupFromUser controller", () => {
  const req = mockRequest();
  const res = mockResponse();
  req.params = {
    id: "619s6070a4s80ab3s6545ess",
  };
  describe("When it receives request with UserID", () => {
    test("Then it should invoke res.json with groups", async () => {
      const updatedUser = {};

      User.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedUser);

      await deleteGroupFromUser(req, res);

      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });
  });

  describe("When it rejects", () => {
    test("Then it should invoke res.json with 404", async () => {
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(undefined);
      res.sendStatus = jest.fn();

      await deleteGroupFromUser(req, res);

      expect(res.sendStatus).toHaveBeenCalled();
    });
  });

  describe("When it rejects with error", () => {
    test("Then it should invoke res.send with error", async () => {
      const error = new Error();
      res.send = jest.fn();

      User.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
      await deleteGroupFromUser(req, res);

      expect(res.send).toHaveBeenCalledWith(error);
    });
  });
});
