import { combineReducers } from "redux";
import users from "./users";

import auth from "./auth";
import message from "./message";
import projectTeams from "./projectTeams";
import projects from "./projects";
import roles from "./roles";

export default combineReducers({
  auth,
  message,
  projectTeams,
  projects,
  roles,
});
