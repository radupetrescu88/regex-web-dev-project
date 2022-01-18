module.exports = (sequelize, Sequelize) => {
  const ProjectTeam = sequelize.define("projectteams", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  });

  return ProjectTeam;
};
