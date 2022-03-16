import mongoose from "mongoose";

const { model, Schema } = mongoose;

interface PostTypes {
  title: string;
  body: string;
  category: string;
}

interface CategoryTypes {
  title: string;
  slug: string;
}
interface WebContentTypes {
  posts: Array<PostTypes>;
  categories: Array<CategoryTypes>;
}

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

const webContentSchema = new Schema({
  posts: [postSchema],
  categories: [categorySchema],
});

const webContent = model<WebContentTypes>(
  "WebContent",
  webContentSchema,
  "WebContents"
);

export default webContent;
