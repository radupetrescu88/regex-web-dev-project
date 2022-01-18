import http from "../http-common";

const API_URL = "http://localhost:8080/api/projects/";

const getAll = () => {
  return http.get(API_URL);
};

const create = (data) => {
  return http.post(API_URL, {
    data,
  });
};

const update = (id, data) => {
  return http.put(`${API_URL}/${id}`, data);
};

const getAllByTeam = (projectTeamId) => {
  return http.get(`${API_URL}by-team/${projectTeamId}`);
};

const getById = (projectId) => {
  return http.get(`${API_URL}${projectId}`);
};

export default {
  getAll,
  create,
  update,
  getAllByTeam,
  getById,
};
