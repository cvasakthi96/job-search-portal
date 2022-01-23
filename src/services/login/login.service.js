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

export const getResetPasswordService = (email) => {
  const url = api.resetPassword + email;
  return axiosInstance
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
export const verifyPasswordTokenService = (token) => {
  const url = api.verifyPasswordToken + token;
  return axiosInstance
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
export const changePasswordService = (data) => {
  const url = api.changePassword;
  return axiosInstance
    .post(url, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
