import { JSONSchemaType } from "ajv";
import { ICreateLeadDTO } from "../../types/Leads";
import { ajv } from "../ajv";

const schema: JSONSchemaType<ICreateLeadDTO> = {
  type: "object",
  properties: {
    first_name: {
      type: "string",
      minLength: 1,
    },
    last_name: {
      type: "string",
      minLength: 1,
    },
    state: {
      type: "string",
      minLength: 1,
    },
    email: {
      type: "string",
      format: "email",
    },
    affiliation: {
      type: "string",
      minLength: 1,
    },
    status: {
      type: "string",
      enum: ["pending", "approved", "rejected"],
    },
    role: {
      type: "string",
      enum: ["user"],
    },
  },
  required: ["first_name", "last_name", "email", "state", "affiliation"],
  additionalProperties: false,
};

export default ajv.compile(schema);
