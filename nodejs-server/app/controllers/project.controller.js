const db = require("../models");
const project = db.project;
const user = db.user;
const projectTeam = db.projectTeam;

const Op = db.Sequelize.Op;

// Create and Save a new Project
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name && !req.body.repository && !req.body.description) {
    res.status(400).send({
      message: "Name, repository and description cannot be empty!",
    });
    return;
  }

  // Create a project object
  const projectObject = {
    name: req.body.name,
    repository: req.body.repository,
    description: req.body.description,
  };

  // Save Project in the database
  project
    .create(projectObject)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project Team.",
      });
    });
};

// Update a Project by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  project
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Project with id=" + id,
      });
    });
};

// Retrieve all project from the database.
exports.findAll = (req, res) => {
  project
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Retrieve all projects from the database by team.
exports.findAllByTeam = (req, res) => {
  const projectTeamId = parseInt(req.params.id);
  projectTeam
    .findOne({
      where: {
        id: projectTeamId,
      },
    })
    .then((projectTeam) => {
      project
        .findAll({
          where: {
            projectteamId: projectTeam.dataValues.id,
          },
        })
        .then((data) => res.send(data));
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Retrieve all projects from the database by id.
exports.findById = (req, res) => {
  const projectId = parseInt(req.params.id);
  project
    .findAll({
      where: {
        id: projectId,
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
