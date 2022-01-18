import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../actions/users";

import { register, login, logout } from "../actions/auth";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

import "./login.css";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const formValidation = () => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setEmailError("Email Not Valid");
    } else {
      setEmailError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formIsValid = formValidation();

    if (formIsValid === true) {
      dispatch(login(email, password))
        .then(() => {
          navigate("/");
        })
        .catch(() => {});
    }
  };

  const goToCreateAccountPage = () => {
    navigate("/register");
  };
  return (
    <div className="login-page d-flex justify-content-center">
      <Card className="col-md-6">
        <Card.Title className="card-title d-flex justify-content-center">
          Login Page
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
                  <Button type="submit" variant="primary">
                    Login
                  </Button>
                  <Button variant="primary" onClick={goToCreateAccountPage}>
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

export default LoginComponent;
