import api from "../../constants/api.constant";
import axiosInstance from "../axios";

export const createJobPostService = (data) => {
  return axiosInstance
    .post(api.createJobs, data, { withAuthorization: true })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
export const getPostedJobs = () => {
  return axiosInstance
    .get(api.postedJobs, { withAuthorization: true })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
