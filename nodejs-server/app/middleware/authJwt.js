const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isPM = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRole().then((role) => {
      if (role.dataValues.name === "PM") {
        next();
        return;
      }

      res.status(403).send({
        message: "Require PM Role!",
      });
      return;
    });
  });
};

isTST = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRole().then((role) => {
      if (role.dataValues.name === "TST") {
        next();
        return;
      }

      res.status(403).send({
        message: "Require TST Role!",
      });
      return;
    });
  });
};

isPMorTST = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRole().then((role) => {
      if (role.name === "PM" || role.name === "TST") {
        next();
        return;
      }

      res.status(403).send({
        message: "Require TST or PM Role!",
      });
      return;
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isPM: isPM,
  isTST: isTST,
  isPMorTST: isPMorTST,
};
module.exports = authJwt;
