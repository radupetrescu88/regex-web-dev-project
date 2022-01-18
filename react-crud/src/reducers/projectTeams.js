import { CREATE_PROJECT_TEAM, RETRIEVE_PROJECT_TEAMS } from "../actions/types";

const initialState = [];

export default function projectTeamsReducer(
  projectTeams = initialState,
  action
) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PROJECT_TEAM:
      return [...projectTeams, payload];

    case RETRIEVE_PROJECT_TEAMS:
      return payload;

    default:
      return projectTeams;
  }
}

export const getProjectTeams = (state) => state.projectTeams;
