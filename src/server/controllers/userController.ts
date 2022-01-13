import { Request, Response } from "express";
import User from "../../database/models/user.js";

const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};

export { getUsers };
