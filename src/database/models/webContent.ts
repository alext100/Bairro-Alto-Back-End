import { model, Schema } from "mongoose";

interface WebContentSchemaTypes {
  title: string;
  body: string;
  category: string;
}

const webContentSchema = new Schema({
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
});

const WebContent = model<WebContentSchemaTypes>(
  "WebContent",
  webContentSchema,
  "WebContentSchemas"
);

export default WebContent;
