import { NextFunction, Request, Response } from "express";
import Lesson from "../../database/models/lesson";
import { ErrorType } from "../../utils/types";

const addLesson = async (req: Request, res: Response) => {
  const { author, date, level, text } = req.body;
  try {
    const newLesson = await Lesson.create({
      author,
      date,
      level,
      text,
    });
    if (!newLesson) return res.sendStatus(404);
    return res.json(newLesson);
  } catch (error) {
    (error as ErrorType).code = 500;
    return res.send(error);
  }
};

export { addLesson };
