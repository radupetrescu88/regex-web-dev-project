import http from "../http-common";

const API_URL = "http://localhost:8080/api/roles/";

const getAll = () => {
  return http.get(API_URL);
};

export default {
  getAll,
};
