import config from "../../config";
import axios from "../../utils/axios";
import { ICreateLeadDTO } from "../../types/Leads";

const createLeadHandler = (dto: ICreateLeadDTO) => {
  return axios.post(config.leadsAPI, dto);
};

const getLeadsHandler = (state: string) => {
  return axios.get(`${config.leadsAPI}?state=${state}`);
};

export default {
  createLeadHandler,
  getLeadsHandler,
};
