import { Request, Response } from "express";
import Lesson from "../../database/models/lesson.js";
import { ErrorType } from "../../utils/types.js";

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

const getAllLessons = async (req: Request, res: Response) => {
  try {
    const allLessons = await Lesson.find();
    if (!allLessons) return res.sendStatus(404);
    res.json(allLessons);
  } catch (error) {
    (error as ErrorType).code = 500;
    return res.send(error);
  }
};

const updateLessonById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const lesson = req.body;
  try {
    const updatedLesson = await Lesson.findByIdAndUpdate(id, lesson, {
      new: true,
    });
    if (!updateLessonById) return res.sendStatus(404);
    return res.status(201).json(updatedLesson);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
};

const deleteLesson = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Lesson.findByIdAndDelete(id);
    res.json(200);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
};

export { addLesson, getAllLessons, updateLessonById, deleteLesson };
