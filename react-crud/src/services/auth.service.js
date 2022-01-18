import http from "../http-common";
const API_URL = "http://localhost:8080/api/auth/";

const register = (data) => {
  return http.post(API_URL + "signup", {
    ...data,
  });
};

const login = (username, password) => {
  return http
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
