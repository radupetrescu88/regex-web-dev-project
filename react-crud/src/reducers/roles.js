import { RETRIEVE_ROLES } from "../actions/types";

const initialState = [];

export default function rolesReducer(roles = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_ROLES:
      return payload;

    default:
      return roles;
  }
}

export const getRoles = (state) => state.roles;
