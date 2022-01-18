import React, { useEffect } from "react";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProjectPage from "./projectPage";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import Projects from "./projects.component";
import { register, login, logout } from "../actions/auth";

import { getCurrentUser } from "../reducers/auth";

import "./content.css";
import { useDispatch, useSelector } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
  }, []);

  return null;
};

export default Logout;
