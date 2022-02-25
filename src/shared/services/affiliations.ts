import config from "../../config";
import axios from "../../utils/axios";

const getAffiliationsHandler = (state: string) => {
  return axios.get(`${config.affiliationAPI}?state=${state}`);
};

export default {
  getAffiliationsHandler,
};
