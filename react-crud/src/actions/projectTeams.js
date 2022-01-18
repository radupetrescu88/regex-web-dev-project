import { CREATE_PROJECT_TEAM, RETRIEVE_PROJECT_TEAMS } from "./types";

import ProjectTeamDataService from "../services/projectTeam.service";

export const createProjectTeam = (data) => async (dispatch) => {
  try {
    const res = await ProjectTeamDataService.create(data);

    dispatch({
      type: CREATE_PROJECT_TEAM,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveProjectTeams = () => async (dispatch) => {
  try {
    const res = await ProjectTeamDataService.getAll();

    dispatch({
      type: RETRIEVE_PROJECT_TEAMS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
