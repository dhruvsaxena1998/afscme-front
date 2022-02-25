import config from "../../config";
import axios from "../../utils/axios";

const fileUploadHandler = (formData: FormData) => {
  return axios.post(config.fileUploadAPI, formData);
};

export default {
  fileUploadHandler,
};
