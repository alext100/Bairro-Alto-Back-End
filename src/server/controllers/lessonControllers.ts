import { Request, Response } from "express";
import Group from "../../database/models/group.js";
import Lesson from "../../database/models/lesson.js";
import { ErrorType } from "../../utils/types.js";

const addLesson = async (req: Request, res: Response) => {
  const {
    author,
    date,
    level,
    body,
    title,
    lessonDescription,
    videos,
    audios,
    info,
    courseName,
  } = req.body;
  try {
    const newLesson = await Lesson.create({
      author,
      title,
      date,
      level,
      body,
      lessonDescription,
      videos,
      audios,
      info,
      courseName,
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
const getAllCourseNames = async (req: Request, res: Response) => {
  try {
    const allCourseNames = await Lesson.find().select("courseName");
    if (!allCourseNames) return res.sendStatus(404);
    res.json(allCourseNames);
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

const getAllGroupLessons = async (req: Request, res: Response) => {
  const { id: groupId } = req.params;
  try {
    const errors = await Group.findById(groupId)
      .populate("lessons")
      .select("lessons");
    res.json(errors);
  } catch (error) {
    res.status(404);
    return res.send(error);
  }
};

export {
  addLesson,
  getAllLessons,
  updateLessonById,
  deleteLesson,
  getAllGroupLessons,
  getAllCourseNames,
};
