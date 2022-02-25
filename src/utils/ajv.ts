import Ajv from "ajv";
import formats from "ajv-formats";

const ajv = new Ajv();
formats(ajv);

ajv.addFormat(
  "email",
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export { ajv };
