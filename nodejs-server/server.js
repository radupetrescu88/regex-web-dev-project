const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const ProjectTeam = db.projectTeam;
const Project = db.project;

db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");

//   initial();
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "PM",
//   });

//   Role.create({
//     id: 2,
//     name: "TST",
//   });

//   ProjectTeam.create({
//     id: 1,
//     name: "Regex",
//   });
//   Project.create({
//     id: 1,
//     name: "project-1",
//     description: "project-1",
//     repository: "project-1",
//     projectteamId: 1,
//   });
//   Project.create({
//     id: 2,
//     name: "project-2",
//     description: "project-2",
//     repository: "project-2",
//     projectteamId: 1,
//   });
//   Project.create({
//     id: 3,
//     name: "project-3",
//     description: "project-3",
//     repository: "project-3",
//   });
// }

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/projectTeam.routes")(app);
require("./app/routes/project.routes")(app);
require("./app/routes/role.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
