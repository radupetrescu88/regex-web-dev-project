import React, { useEffect } from "react";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProjectPage from "./projectPage";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import Projects from "./projects.component";

import { getCurrentUser } from "../reducers/auth";

import "./content.css";
import { useSelector } from "react-redux";

const Content = () => {
  const currentUser = useSelector(getCurrentUser);

  const navigate = useNavigate();
  const { pathname } = window.location;
  useEffect(() => {
    if (pathname === "/") {
      navigate("/projects");
    }
  });
  return (
    <div className="navbar-container">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/projects">Projects</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <NavDropdown title={currentUser.username} id="basic-nav-dropdown">
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/projects/:projectId" element={<ProjectPage />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </div>
  );
};

export default Content;
