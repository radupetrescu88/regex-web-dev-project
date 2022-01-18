import {
  CREATE_PROJECT,
  UPDATE_PROJECT,
  RETRIEVE_PROJECTS,
  RETRIEVE_PROJECTS_BY_TEAM,
  RETRIEVE_PROJECT_BY_ID,
} from "./types";

import ProjectDataService from "../services/project.service";

export const createProject = (data) => async (dispatch) => {
  try {
    const res = await ProjectDataService.create(data);

    dispatch({
      type: CREATE_PROJECT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateProject = (id, data) => async (dispatch) => {
  try {
    const res = await ProjectDataService.update(id, data);

    dispatch({
      type: UPDATE_PROJECT,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveProjects = () => async (dispatch) => {
  try {
    const res = await ProjectDataService.getAll();

    dispatch({
      type: RETRIEVE_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const retrieveProjectsByTeam = (projectTeamId) => async (dispatch) => {
  try {
    const res = await ProjectDataService.getAllByTeam(projectTeamId);

    dispatch({
      type: RETRIEVE_PROJECTS_BY_TEAM,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const retrieveProjectById = (projectId) => async (dispatch) => {
  try {
    const res = await ProjectDataService.getById(projectId);

    dispatch({
      type: RETRIEVE_PROJECT_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
