import { Request, Response } from "express";
import WebContent from "../../database/models/webContent.js";
import { ErrorType } from "../../utils/types.js";

const getWebContent = async (req: Request, res: Response) => {
  try {
    const webContent = await WebContent.find();
    if (!webContent) return res.sendStatus(404);
    res.json(webContent);
  } catch (error) {
    (error as ErrorType).code = 500;
    return res.send(error);
  }
};

const updateWebContent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const webContent = req.body;
  try {
    const updatedWebContent = await WebContent.findByIdAndUpdate(
      id,
      webContent,
      { new: true }
    );
    if (!updatedWebContent) return res.sendStatus(404);
    return res.status(201).json(updatedWebContent);
  } catch (error) {
    (error as ErrorType).code = 500;
    return res.send(error);
  }
};

const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { collectionId } = req.body;
  try {
    const response = await WebContent.updateMany(
      { _id: collectionId },
      { $pull: { posts: { _id: id } } }
    );
    if (!response) return res.sendStatus(404);
    res.json(200);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { collectionId } = req.body;
  try {
    const response = await WebContent.updateMany(
      { _id: collectionId },
      { $pull: { categories: { _id: id } } }
    );
    if (!response) return res.sendStatus(404);
    res.json(200);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
};

const updatePostById = async (req: Request, res: Response) => {
  const { post } = req.body;
  const { collectionId } = req.body;
  try {
    const updatedPost = await WebContent.updateOne(
      { _id: collectionId, [`posts._id`]: post.id },
      {
        $set: {
          [`posts.$.body`]: post.body,
          [`posts.$.title`]: post.title,
          [`posts.$.category`]: post.category,
          [`posts.$.image`]: post.image,
        },
      },
      {
        new: true,
      }
    );
    if (!updatedPost.acknowledged) return res.sendStatus(404);
    return res.status(201).json(updatedPost);
  } catch (error) {
    (error as ErrorType).code = 500;
    return res.send(error);
  }
};

export {
  getWebContent,
  updateWebContent,
  deletePost,
  deleteCategory,
  updatePostById,
};
