import api from "../../constants/api.constant";
import axiosInstance from "../axios";

export const userLoginService = (data) => {
  return axiosInstance
    .post(api.login, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
