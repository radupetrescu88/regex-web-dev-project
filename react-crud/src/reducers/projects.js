import {
  CREATE_PROJECT,
  UPDATE_PROJECT,
  RETRIEVE_PROJECTS,
  RETRIEVE_PROJECTS_BY_TEAM,
  RETRIEVE_PROJECT_BY_ID,
} from "../actions/types";

const initialState = [];

export default function projectsReducer(projects = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PROJECT:
      return [...projects, payload];

    case UPDATE_PROJECT:
      return projects.map((project) => {
        if (project.id === payload.id) {
          return {
            ...project,
            ...payload,
          };
        } else {
          return project;
        }
      });

    case RETRIEVE_PROJECTS:
    case RETRIEVE_PROJECTS_BY_TEAM:
    case RETRIEVE_PROJECT_BY_ID:
      return payload;

    default:
      return projects;
  }
}

export const getProjects = (state) => state.projects;
