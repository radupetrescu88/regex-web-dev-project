import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getProjects } from "../reducers/projects";

const ProjectPage = () => {
  const params = useParams();
  const projects = useSelector(getProjects);

  const project = projects.find(
    (item) => item.id == parseInt(params.projectId)
  );

  return (
    <div>
      <p>Name: {project?.name} </p>
      <p>Description: {project?.description} </p>
      <p>Repository: {project?.repository} </p>
    </div>
  );
};

export default ProjectPage;
