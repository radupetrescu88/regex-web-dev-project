import http from "../http-common";

const API_URL = "http://localhost:8080/api/project-teams/";

const getAll = () => {
  return http.get(API_URL);
};

const create = (data) => {
  return http.post(API_URL, {
    data,
  });
};

export default {
  getAll,
  create,
};
