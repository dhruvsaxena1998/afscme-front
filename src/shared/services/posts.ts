import config from "../../config";
import axios from "../../utils/axios";

const createPostHandler = (dto: any) => {
  return axios.post(config.postsAPI, dto);
};

export default {
  createPostHandler,
};
