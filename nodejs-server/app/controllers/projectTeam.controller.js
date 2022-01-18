const db = require("../models");
const projectTeam = db.projectTeam;

const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Name cannot be empty!",
    });
    return;
  }

  // Create a project team object
  const projectTeamObject = {
    name: req.body.name,
  };

  // Save Tutorial in the database
  projectTeam
    .create(projectTeamObject)
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

// Retrieve all project teams from the database.
exports.findAll = (req, res) => {
  projectTeam
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
