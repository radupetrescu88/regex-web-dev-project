import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../actions/users";

import { register, login, logout } from "../actions/auth";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

import { retrieveProjectTeams } from "../actions/projectTeams";
import { retrieveRoles } from "../actions/roles";
import { retrieveProjects } from "../actions/projects";

import { getRoles } from "../reducers/roles";
import { getProjectTeams } from "../reducers/projectTeams";
import { getProjects } from "../reducers/projects";

import "./login.css";

const RegisterComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [role, setRole] = useState({});
  const [roleError, setRoleError] = useState("");
  const [projectTeam, setProjectTeam] = useState({});
  const [projectTeamError, setProjectTeamError] = useState("");
  const [project, setProject] = useState({});
  const [projectError, setProjectError] = useState("");

  const roles = useSelector(getRoles);
  const projectTeams = useSelector(getProjectTeams);
  const projects = useSelector(getProjects);

  useEffect(() => {
    dispatch(retrieveRoles());
    dispatch(retrieveProjectTeams());
    dispatch(retrieveProjects());
  }, []);

  const formValidation = () => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setEmailError("Email Not Valid");
    } else {
      setEmailError("");
    }

    if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setPasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
    } else {
      setPasswordError("");
    }

    if (Object.keys(role).length === 0) {
      formIsValid = false;
      setRoleError("You must select a role");
    } else {
      setRoleError("");
    }

    if (
      Object.keys(role).length > 0 &&
      role.name === "PM" &&
      Object.keys(projectTeam).length === 0
    ) {
      formIsValid = false;
      setProjectTeamError("You must select a project team");
    } else {
      setProjectTeamError("");
    }

    if (
      Object.keys(role).length > 0 &&
      role.name === "TST" &&
      Object.keys(project).length === 0
    ) {
      formIsValid = false;
      setProjectError("You must select a project");
    } else {
      setProjectError("");
    }

    return formIsValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formIsValid = formValidation();

    if (formIsValid === true) {
      let data = { username: email, password: password, role: role.id };
      if (role.name === "PM") {
        data = {
          ...data,
          projectTeam: projectTeam.id,
        };
      } else if (role.name === "TST") {
        data = {
          ...data,
          project: project.id,
        };
      }

      dispatch(register(data))
        .then(() => {
          navigate("/login");
        })
        .catch(() => {});
    }
  };

  return (
    <div className="login-page d-flex justify-content-center">
      <Card className="col-md-6">
        <Card.Title className="card-title d-flex justify-content-center">
          Register Page
        </Card.Title>
        <Card.Body>
          <div className="App">
            <div className="container">
              <div className="row d-flex justify-content-center">
                <form id="loginform" onSubmit={onSubmit}>
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      className="form-control"
                      id="EmailInput"
                      name="EmailInput"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <small id="emailHelp" className="text-danger form-text">
                      {emailError}
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <small id="passworderror" className="text-danger form-text">
                      {passwordError}
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <select
                      onChange={(event) =>
                        setRole({
                          id: event.target.value,
                          name: roles.find(
                            (item) => item.id == event.target.value
                          ).name,
                        })
                      }
                    >
                      {Object.keys(role).length === 0 && (
                        <option>{"Select a role"}</option>
                      )}
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    <small id="rolehelp" className="text-danger form-text">
                      {roleError}
                    </small>
                  </div>
                  {role && role.name === "PM" && (
                    <div className="form-group">
                      <label>Project Team</label>
                      <select
                        onChange={(event) =>
                          setProjectTeam({
                            id: event.target.value,
                            name: projectTeams.find(
                              (item) => item.id == event.target.value
                            ).name,
                          })
                        }
                      >
                        {Object.keys(projectTeam).length === 0 && (
                          <option value={undefined}>
                            {"Select a project team"}
                          </option>
                        )}
                        {projectTeams.map((projectTeam) => (
                          <option key={projectTeam.id} value={projectTeam.id}>
                            {projectTeam.name}
                          </option>
                        ))}
                      </select>
                      <small id="rolehelp" className="text-danger form-text">
                        {projectTeamError}
                      </small>
                    </div>
                  )}
                  {role && role.name === "TST" && (
                    <div className="form-group">
                      <label>Project</label>
                      <select
                        onChange={(event) =>
                          setProject({
                            id: event.target.value,
                            name: projects.find(
                              (item) => item.id == event.target.value
                            ).name,
                          })
                        }
                      >
                        {Object.keys(project).length === 0 && (
                          <option value={undefined}>
                            {"Select a project"}
                          </option>
                        )}
                        {projects.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.name}
                          </option>
                        ))}
                      </select>
                      <small id="rolehelp" className="text-danger form-text">
                        {projectError}
                      </small>
                    </div>
                  )}

                  <Button type="submit" variant="primary">
                    Create account
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RegisterComponent;
