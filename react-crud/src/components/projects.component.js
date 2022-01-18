import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {
  retrieveProjectsByTeam,
  retrieveProjectById,
} from "../actions/projects";

import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./projects.css";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../reducers/auth";
import { getProjects } from "../reducers/projects";

const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(getCurrentUser);
  const projects = useSelector(getProjects);

  useEffect(() => {
    if (currentUser.roleId === 1) {
      dispatch(retrieveProjectsByTeam(currentUser.projectteamId));
    } else if (currentUser.roleId === 2) {
      dispatch(retrieveProjectById(currentUser.projectId));
    }
  }, []);

  const products = projects.map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description,
    repository: project.repository,
  }));
  const columns = [
    { dataField: "id", text: "Id" },
    { dataField: "name", text: "Name" },
    { dataField: "description", text: "Description" },
    { dataField: "repository", text: "Repository" },
  ];

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      const { id } = row;
      navigate(`/projects/${id}`);
    },
  };

  return (
    <div className="projects-container col-md-6">
      <BootstrapTable
        hover={true}
        keyField="id"
        data={products}
        columns={columns}
        rowEvents={rowEvents}
      />
    </div>
  );
};

export default Projects;
