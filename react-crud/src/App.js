import { React, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "./logo.svg";

import { Routes, Route, Navigate } from "react-router-dom";

import LoginComponent from "./components/login.component";
import RegisterComponent from "./components/register.component";
import Content from "./components/content.component";
import Logout from "./components/logout.component";

import { getIsLoggedIn } from "./reducers/auth";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/logout"
          element={isLoggedIn ? <Logout /> : <Navigate to="/login" />}
        />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route
          path="*"
          element={isLoggedIn ? <Content /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
