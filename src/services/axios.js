import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});
const isWithAuthorization = (config = {}) => {
  return config.hasOwnProperty("withAuthorization") && !config.withAuthorization
    ? false
    : true;
};
axiosInstance.interceptors.request.use((request) => requestHandler(request));
const requestHandler = (request) => {
  if (isWithAuthorization(request)) {
    if (request.data) {
      delete request.data.withAuthorization;
    }
    const tokenId = localStorage.getItem("portal-token");
    if (tokenId) {
      request.headers["Authorization"] = `Bearer ${tokenId}`;
    }
  }
  return request;
};

export default axiosInstance;
