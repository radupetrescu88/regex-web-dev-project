const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.projectTeam = require("../models/projectTeam.model")(sequelize, Sequelize);
db.project = require("../models/project.model")(sequelize, Sequelize);

// User - role
db.role.hasMany(db.user, {
  foreignKey: "roleId",
});
db.user.belongsTo(db.role);

// User - project team
db.projectTeam.hasMany(db.user, {
  foreignKey: "projectteamId",
});
db.user.belongsTo(db.projectTeam);

// User - project
db.project.hasMany(db.user, {
  foreignKey: "projectId",
});
db.user.belongsTo(db.project);

// Project team - project
db.projectTeam.hasMany(db.project, {
  foreignKey: "projectteamId",
});
db.project.belongsTo(db.projectTeam);

db.ROLES = ["PM", "TST"];

module.exports = db;
