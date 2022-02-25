import { ajv } from "../ajv";

const schema = {
  properties: {
    category: {
      type: "string",
    },
    summary: {
      type: "string",
      minLength: 1,
    },
    description: {
      type: "string",
      minLength: 1,
    },
    attachment: {
      type: "string",
    },
    user: {
      type: "string",
    },
  },
  required: ["category", "summary", "description", "user"],
  additionalProperties: false,
};

export default ajv.compile(schema);
